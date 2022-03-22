import { createAsyncThunk } from '@reduxjs/toolkit';

const sleep = (ms)=>{
   return new Promise(resolve=>setTimeout(resolve,ms));
}

export const DbList = createAsyncThunk(
   'dbase/DbList',
   async(args,{ rejectWithValue })=>{
      try{
	 const res = await GCAPIv1.DbList();
	 await sleep(2000);
	 return res;
      }catch(err){
	 return err;
      }
   }
);
