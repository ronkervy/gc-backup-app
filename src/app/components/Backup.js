import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Grid,
  InputBase
} from '@mui/material';

import { BackupList } from '../store/backup.services';

function Backup() {

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch( BackupList() );
    },[]);

    return(
	<div>
	    <Grid container>
		<Grid item lg={12}>
		    <InputBase placeholder="Browse" type="file" />
		</Grid>
		<Grid item lg={12}>
		    <Button
		      color="primary"
		      variant="contained"
		      onClick={()=>{
			console.log('TEST');
		      }}
		    >Backup</Button>
		</Grid> 
	    </Grid>
	</div>
    );
}

export default Backup;

