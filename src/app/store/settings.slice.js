import { createSlice } from '@reduxjs/toolkit';
import {
   GetSettings
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
   }
});

export default SettingsSlice.reducer;
