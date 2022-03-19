import React from 'react';
import { 
   Grid,
   TextField,
   MenuItem 
} from '@mui/material';
import { GetSettings } from '../store/settings.services';
import { useSelector,useDispatch } from 'react-redux';

function SettingsPage() {

   return(
      <Grid container className="settingsPage">
	 <Grid item md={12} sm={12}>
	    
	 </Grid>
      </Grid>
   );
}

export default SettingsPage;

