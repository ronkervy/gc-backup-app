const { 
  app, 
  BrowserWindow,
  session,
  dialog,
  ipcMain,
  shell
} = require('electron');
const path = require('path');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const { ElectronJSONSettingsStoreMain } = require('electron-json-settings-store');

const schema = {
    schedule : { type: 'string', default: '0 9 */7 * *' },
    backupPath: { type: 'string', default: 'C:/backups' }
}

const store = new ElectronJSONSettingsStoreMain(schema,{ writeBeforeQuit: true });

const initializeStore = async()=>{
    await store.initSync();
}

let mainWindow;

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
   const usrProfile = process.env['USERPROFILE'];
   try{
      const dialogPath = dialog.showOpenDialogSync(mainWindow,{
	properties: ['openDirectory']
      });
      console.log(dialogPath); 
      return dialogPath[0];
   }catch(err){
      let defaultPath = await store.get('backupPath');
      return defaultPath;
   }
});

ipcMain.handle('window:close',()=>{
   app.quit();
});

ipcMain.handle('window:min',()=>{
   mainWindow.minimize();
});

//HANDLES FOR SETTINGS
ipcMain.handle('config:get', async()=>{
    const settings = await store.getAll;
    return settings;
});

ipcMain.handle('config:set', async(e,args)=>{
    await store.setAll(args);
    await store.writeSync();
    console.log(store.get('schedule'));
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
