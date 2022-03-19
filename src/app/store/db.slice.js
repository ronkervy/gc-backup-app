import { createSlice } from '@reduxjs/toolkit';
import { DbList } from './db.services';
const initialState = {
   entities: [],
   loading: true,
   error: ''
}

const DbSlice = createSlice({
   name: 'dbase',
   initialState,
   extraReducers: builder=>{
      //GET DATABASE COLLECTION LIST
      builder.addCase(DbList.pending, state=>{
	  state.loading = true;
      })
      .addCase(DbList.fulfilled,(state,{ payload })=>{
	  state.loading = false;
	  state.entities = payload;
      })
      .addCase(DbList.rejected,(state,{ payload })=>{
	  state.loading = false;
	  state.error = payload;
      })
   }
});

export default DbSlice.reducer;
