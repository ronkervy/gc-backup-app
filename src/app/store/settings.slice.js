import { createSlice } from '@reduxjs/toolkit';
import {
   GetSettings,
   SetSettings,
   ResetSettings
} from './settings.services';

const initialState = {
   entities: [],
   loading: true,
   error: ''
}

const SettingsSlice = createSlice({
   name: 'settings',
   initialState,
   extraReducers: builder=>{
      //GET SETTINGS
      builder.addCase(GetSettings.pending,state=>{
	 state.loading = true;
      })
      .addCase(GetSettings.fulfilled,(state,{ payload })=>{
	 state.loading = false;
	 state.entities = payload;
      })
      .addCase(GetSettings.rejected,(state,{ payload })=>{
	 state.loading = false;
	 state.error = payload;
      })
      //SET SETTINGS
      .addCase(SetSettings.pending,state=>{
	 state.loading = true;
      })
      .addCase(SetSettings.fulfilled,(state,{ payload })=>{
	 state.loading = false;
	 state.entities = payload;
      })
      .addCase(SetSettings.rejected,(state,data)=>{
	 state.loading = false;
	 state.error = data.payload;
      })
      //RESET SETTINGS
      .addCase(ResetSettings.pending,state=>{
	 state.loading = true;
      })
      .addCase(ResetSettings.fulfilled,(state,{ payload })=>{
	 state.loading = false;
	 state.entities = payload;
      })
      .addCase(ResetSettings.rejected,(state,{ payload })=>{
	 state.loading = false;
	 state.error = payload;
      })
   }
});

export default SettingsSlice.reducer;
