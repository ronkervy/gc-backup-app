const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: path.resolve(__dirname,'./out/gc-backup-app-win32-x64'),
  description: 'GC Backup Application',
  exe: 'gc-backup-app',
  name: 'GC BACKUP APP',
  manufacturer: 'KVM Tech',
  version: '1.0.1',
  appIconPath : path.resolve(__dirname,'./src/public/img/logo.ico'),
  outputDirectory: path.resolve(__dirname,'./msi'),
  features : {
    autoLaunch : true
  },
  ui : {      
      chooseDirectory : true,
  }
});

// Step 2: Create a .wxs template file
msiCreator.create().then(()=>{
    msiCreator.compile();
}).catch(err=>{
  console.log(err);
});
