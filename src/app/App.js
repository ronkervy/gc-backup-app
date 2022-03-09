import React,{ useEffect } from 'react';
import { 
  Grid,
  Button,
  InputBase
} from '@mui/material';

import Backup from './components/Backup';

function App() {
  
    const setSchedule = ()=>{
	window.ConfigAPI.SetSettings({
	    schedule : "0 9 */7 * *"
	});
    }

    useEffect(()=>{
	  window.ConfigAPI.GetSettings();
    },[]);

    return(
      <div className="App">
	<Backup />
	<Button
	  variant="contained"
	  color="primary"
	  onClick={setSchedule}
	>Set Settings</Button>
      </div> 
    );
}

export default App;

