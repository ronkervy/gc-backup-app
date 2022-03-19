import React from 'react';
import { 
   Grid,
   TextField,
   MenuItem 
} from '@mui/material';
import { GetSettings } from '../store/settings.services';
import { useSelector,useDispatch } from 'react-redux';

function SettingsPage() {

   const dispatch = useDispatch();
   const { entities: settings,loading } = useSelector(state=>state.settings);
   const [sched,setSched] = React.useState('0 9 */7 * *');

   const handleSchedChange = (e)=>{
      setSched(e.target.value);
   }

   React.useEffect(()=>{
   },[]);

   if(loading || settings.length === 0){
      return <div>loading...</div>
   }

   return(
      <Grid spacing={2} container className="settingsPage">
	 {console.log(sched)}
	 <Grid item md={12} sm={12}>
	    <TextField
	       size="small"
	       variant="outlined"
	       fullWidth
	       label="Default Path"
	    />	    
	 </Grid>
	 <Grid item md={6} sm={6}>
	    <TextField
	       size="small"
	       variant="outlined"
	       fullWidth
	       label="Default Path"
	    />	    
	 </Grid>
	 <Grid item md={6} sm={6}>
	    <TextField
	       select
	       value={sched}
	       size="small"
	       variant="outlined"
	       fullWidth
	       label="Schedule"
	       onChange={handleSchedChange}
	       style={{ WebkitAppRegion: "no-drag" }}
	    >
	       {settings.scheduleFormat.map((schedule,i)=>{
		  return(
		     <MenuItem 
			value={Object.values(schedule).toString()}
			style={{ WebkitAppRegion: "no-drag" }} 
			key={i}
		     >{i == 0 ? 'Weekly' : i == 1 ? 'Monthly' : 'Once a day'}</MenuItem>
		  );
	       })}
	    </TextField>
	 </Grid> 
      </Grid>
   );
}

export default SettingsPage;

