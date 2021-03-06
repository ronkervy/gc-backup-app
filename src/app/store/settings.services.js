import { createAsyncThunk } from '@reduxjs/toolkit';

const sleep = (ms)=>{
   return new Promise(resolve=>setTimeout(resolve,ms));
}

export const GetSettings = createAsyncThunk(
   'settings/GetSettings',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await ConfigAPI.GetSettings();
	 await ConfigAPI.RenderEnv();
	 await sleep(2000);
	 return res;
      }catch(err){
	 return err;
      }
   }
);

export const SetSettings = createAsyncThunk(
   'settings/SetSettings',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await ConfigAPI.SetSettings(args);
	 await sleep(2000);
	 return res;
      }catch(err){
	 return err;
      }
   }
);

export const ResetSettings = createAsyncThunk(
   'settings/ResetSettings',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await ConfigAPI.ResetSettings();
	 await sleep(2000);
	 return res;
      }catch(err){
	 return err;
      }
   }
);
