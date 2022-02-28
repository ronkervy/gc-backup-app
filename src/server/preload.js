const { contextBridge } = require('electron');
const server = require('../server/index');
const axios = require('axios');
const { ipcRenderer } = require('electron');

const BackupService = axios.create({
    baseURL: "http://localhost:8081/api/v1"
});

contextBridge.exposeInMainWorld(
  'dialogAPI',
  {
    OpenDialog: ()=> ipcRenderer.invoke('dialog:open')
  }
);

contextBridge.exposeInMainWorld(
  'gcAPIV1', 
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
      }
  }
)



