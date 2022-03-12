const { contextBridge } = require('electron');
const server = require('../server/index');
const axios = require('axios');
const { ipcRenderer } = require('electron');

const BackupService = axios.create({
    baseURL: "http://localhost:8081/api/v1"
});

contextBridge.exposeInMainWorld(
  'FileAPI',
  {
    FileList: (fPath)=> ipcRenderer.invoke('file:list',{ fPath })  
  }
);

contextBridge.exposeInMainWorld(
  'DialogAPI',
  {
    OpenDialog: ()=> ipcRenderer.invoke('dialog:open')
  } 
);

contextBridge.exposeInMainWorld(
  'ConfigAPI',
  {
    GetSettings: ()=> ipcRenderer.invoke('config:get'),
    SetSettings: (args)=> ipcRenderer.invoke('config:set',args)
  }
);

contextBridge.exposeInMainWorld(
  'APIV1', 
  {
      BackupList: async()=>{
	 try{
	    const res = await BackupService({
		url: '/backups',
		method: 'GET' 
	    });
	    return res.data;
	 }catch(err){
	    return err.response.data;
	 } 
      },

      CreateBackup: async(data)=>{
	  console.log(data);
	  try{
	    const res = await BackupService({
		url: "/backups",
		method: "POST",
		data: data
	    });
	    return res.data;
	 }catch(err){
	    return err.response.data;
	 }
      },

      RestoreBackup: async(data)=>{
	  try{
	      const res = await BackupService({
		  url: "/backups/restore",
		  method: "POST",
		  data: data
	      });
	      return res.data;
	  }catch(err){
	      return err.response.data;
	  }
      }
  }
)



