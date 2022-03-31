const { contextBridge } = require('electron');
const server = require('../server/index');
const axios = require('axios');
const { ipcRenderer } = require('electron');

const BackupService = axios.create({
    baseURL: "http://localhost:8083/api/v1"
});

contextBridge.exposeInMainWorld(
  'DialogAPI',
  {
    OpenDialog: ()=> ipcRenderer.invoke('dialog:open'),
    OpenFile: (args)=> ipcRenderer.invoke('dialog:openFile',args),
    CloseBtn: ()=> ipcRenderer.invoke('window:close'),
    MinimizeBtn: ()=> ipcRenderer.invoke('window:min')
  } 
);

contextBridge.exposeInMainWorld(
  'ConfigAPI',
  {
    GetSettings: ()=> ipcRenderer.invoke('config:get'),
    SetSettings: (args)=> ipcRenderer.invoke('config:set',args),
    CronJob: (args)=> ipcRenderer.invoke('config:cron',args),
    RenderEnv: ()=> ipcRenderer.invoke('config:setenv'),
    ResetSettings: ()=> ipcRenderer.invoke('config:reset'),
    CronLog: (channel,cb)=>{
       ipcRenderer.on(channel,(e,args)=>cb(args))
    } 
  }
);

contextBridge.exposeInMainWorld(
  'GCAPIv1', 
  {
      DbList: async()=>{
	 try{
	    const res = await BackupService({
	       url: '/list/database',
	       method: 'GET'
	    });
	    return res.data;
	 }catch(err){
	    return err.response.data;
	 }
      },

      BackupList: async(fpath)=>{
	 try{
	    const res = await BackupService({
		url: '/backups',
		method: 'GET',
	        params: { file_path: fpath }
	    });
	    return res.data;
	 }catch(err){
	    return err.response.data;
	 } 
      },

      CreateBackup: async(data)=>{
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
