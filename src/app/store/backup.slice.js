import { createSlice } from '@reduxjs/toolkit';
import {BackupList} from './backup.services';

const BackupSlice = createSlice({
  name: 'backup',
  initialState: {
      entities: [],
      loading: true,
      error: ''
  },
  extraReducers: builder=>{
      builder.addCase(BackupList.pending,state=>{
	  state.loading = false;
      })
      .addCase(BackupList.fulfilled,(state,{ payload })=>{
	  state.loading = false;
	  state.entities = payload;
      })
      .addCase(BackupList.rejected,(state,{ payload })=>{
	  state.loading = false;
	  state.error = payload;
      })
  }
});

export default BackupSlice.reducer;
