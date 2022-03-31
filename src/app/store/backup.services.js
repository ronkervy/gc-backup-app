import { createAsyncThunk } from '@reduxjs/toolkit';

const sleep = (ms)=>{
   return new Promise(resolve=>setTimeout(resolve,ms));
}

export const BackupList = createAsyncThunk(
  'backup/BackupList',
  async(args,{ rejectWithValue })=>{
     try{
	const res = await GCAPIv1.BackupList(args);
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
	const res = await GCAPIv1.CreateBackup(args);
	await sleep(2000);
	return res;
      }catch(err){
	return rejectWithValue(err);
      }
  }
);

export const RestoreBackup = createAsyncThunk(
   'backup/RestoreBackup',
   async(args,{ rejectWithValue })=>{
      try{
	const res = await GCAPIv1.RestoreBackup(args);
        await(2000);
        return res;
      }catch(err){
	 return rejectWithValue(err);
      }
   }
);
