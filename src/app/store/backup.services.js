import { createAsyncThunk } from '@reduxjs/toolkit';

const sleep = (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms));
}

export const BackupList = createAsyncThunk(
  'backup/BackupList',
  async(args,{ rejectWithValue })=>{
     try{
	const res = await GCAPIv1.BackupList();
	await sleep(1000);
	return res;
     }catch(err){
	return err;
     }
  }
);

export const DbList = createAsyncThunk(
   'backup/DbList',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await GCAPIv1.DbList();
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
	const res = await APIV1.CreateBackup(args);
	await sleep(1000);
	return res;
      }catch(err){
	return err;
      }
  }
);
