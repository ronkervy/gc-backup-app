const { 
  app, 
  BrowserWindow,
  session,
  dialog,
  ipcMain,
  shell,
  Menu,
  Tray
} = require('electron');
const path = require('path');
const cron = require('node-cron');
const { execSync } = require('child_process');
const { access,mkdir } = require('fs/promises');
const { constants } = require('fs');
const schema = require('./config/schedule.schema');
const MenuTemplate = require('./config/tray.template');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const { ElectronJSONSettingsStoreMain } = require('electron-json-settings-store');
const store = new ElectronJSONSettingsStoreMain(schema,{ writeBeforeQuit: true });

const initializeStore = async()=>{
    await store.initSync();
}

let mainWindow;
let tray = null;

const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    autoHideMenuBar: true,  
    webPreferences: {
	nodeIntegration: false,
	contextIsolation: true,
	preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  mainWindow.on('ready-to-show',()=>{
      mainWindow.show();
      mainWindow.focus();
  });
  

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',()=>{
   if( process.env.NODE_ENV == "development" ){
       const { 
	 default: installExtension, 
	 REACT_DEVELOPER_TOOLS, 
	 REDUX_DEVTOOLS 
       } = require('electron-devtools-installer');

       installExtension(REDUX_DEVTOOLS)
	   .then((name) => console.log(`Added Extension:  ${name}`))
	   .catch((err) => console.log('An error occurred: ', err));
   }
   
   tray = tray == null ? new Tray(path.join(__dirname,'./public/img/logo.ico')) : tray;
   
   const contextMenu = Menu.buildFromTemplate(
      [
	 {
	    label: 'Restore',
	    click: ()=>{
	       console.log('Show');
	       setTimeout(()=>{
		  mainWindow.show();
		  mainWindow.focus();
	       },0);
	    }
	 },
	 { type: 'separator' },
	 {
	    label: 'Exit',
	    click: ()=>{
	       app.quit();
	    }
	 }
     ]
   );
   tray.setToolTip("Backup running.");
   tray.setContextMenu(contextMenu);
   initializeStore();
   createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//HANDLE FOR FILE DIALOGS AND WINDOW BUTTON 
ipcMain.handle('dialog:open', async()=>{
   try{
      const dialogPath = dialog.showOpenDialogSync(mainWindow,{
	properties: ['openDirectory']
      });
      return dialogPath[0];
   }catch(err){
      let defaultPath = await store.get('backupPath');
      return defaultPath;
   }
});

ipcMain.handle('dialog:openFile',async(e,args)=>{
   shell.openPath(args);
});

ipcMain.handle('window:close',()=>{
   app.quit();
});

ipcMain.handle('window:min',()=>{
   mainWindow.hide();
});

//HANDLES FOR SETTINGS
ipcMain.handle('config:get', async()=>{
    const settings = await store.getAll;
    return settings;
});

ipcMain.handle('config:set', async(e,args)=>{
    await store.setAll(args);
    await store.writeSync();
    const settings = await store.getAll;
    return settings;
});

ipcMain.handle('config:reset', async()=>{
   await store.reset();
   const settings = await store.getAll;
   return settings;
});

ipcMain.handle('config:cron', async(e,args)=>{
   const { schedule,backupPath } = args;
   let task = cron.schedule(schedule,()=>{
      const axios = require('axios');
      axios.post('http://localhost:8083/api/v1/backups',{
	 path: backupPath,
	 dbName: ''
      });
      mainWindow.webContents.send('cron:log','Cron is running...');
   },{
      schedule: true,
      timezone: "Asia/Manila"
   });
   task.start();
});

ipcMain.handle('config:setenv', async(e,args)=>{
   try{
      await execSync('setx REACT_APP_GC_BACKUP 1');
   }catch(err){
      return err;
   }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
