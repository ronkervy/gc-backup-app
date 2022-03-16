import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BackupServiceV1 = axios.create({
    baseURL: "http://localhost:8083/api/v1"
});

const sleep = (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms));
}

export const BackupList = createAsyncThunk(
  'backup/BackupList',
  async(args,{ rejectWithValue })=>{
     try{
	const res = await window.GCAPIv1.BackupList();
	await sleep(1000);
	return res;
     }catch(err){
	return err;
     }
  }
);

export const DatabaseList = createAsyncThunk(
   'backup/DatabaseList',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await window.GCAPIv1.DbList();
	 await sleep(1000);
	 return res;
      }catch(err){
	 return err;
      }
   }
);

export const CreateBackup = createAsyncThunk(
  'backup/CreateBackup',
  async(args,{ rejectWithValue })=>{
      try{
	const res = await window.APIV1.CreateBackup(args);
	await sleep(1000);
	return res;
      }catch(err){
	return err;
      }
  }
);
