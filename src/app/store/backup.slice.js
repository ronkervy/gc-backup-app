import { createSlice } from '@reduxjs/toolkit';
import {BackupList,CreateBackup,RestoreBackup} from './backup.services';

const BackupSlice = createSlice({
  name: 'backup',
  initialState: {
      entities: [],
      loading: true,
      error: ''
  },
  extraReducers: builder=>{
      //LIST BACKUPS
      builder.addCase(BackupList.pending,state=>{
	  state.loading = true;
      })
      .addCase(BackupList.fulfilled,(state,{ payload })=>{
	  state.loading = false;
	  state.entities = payload;
      })
      .addCase(BackupList.rejected,(state,{ payload })=>{
	  state.loading = false;
	  state.error = payload;
      })
      
      //CREATE BACKUP
      .addCase(CreateBackup.pending, state=>{
	  state.loading = true;
      })
      .addCase(CreateBackup.fulfilled,(state,{ payload })=>{
	  state.loading = false;
	  state.entities = payload;
      })
      .addCase(CreateBackup.rejected,(state,{ payload })=>{
	  state.loading = false;
	  state.error = payload;
      })
      //RESTORE BACKUP
      .addCase(RestoreBackup.pending,state=>{
	 state.loading = true;
      })
      .addCase(RestoreBackup.fulfilled,(state,{ payload })=>{
	 state.loading = false;
	 state.entities = payload;
      })
      .addCase(RestoreBackup.rejected,(state,{ payload })=>{
	 state.loading = false;
	 state.error = payload;
      });
  }
});

export default BackupSlice.reducer;
