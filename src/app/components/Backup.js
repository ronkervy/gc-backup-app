import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  InputBase
} from '@mui/material';

import { BackupList, CreateBackup } from '../store/backup.services';

function Backup() {
    
    const [path,setPath] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.backups);

    const selectedPath = async(e)=>{
	const folderPath = await window.DialogAPI.OpenDialog();
	setPath(folderPath);
    }

    const FileList = async()=>{
	const list = await window.FileAPI.FileList("C:/Users/kervy/Projects/gc-backup-app"); 
	console.log(list);
    } 

    useEffect(()=>{
      FileList();
      dispatch( BackupList() );
    },[]);

    if( loading ) return <div>Loading...</div>

    return(
	<div>
	    <Grid container>
		<Grid item lg={12}>
		    <InputBase 
			placeholder="Browse" 
			value={path}
			variant="contained"
			onClick={selectedPath}
		    />
		</Grid>
		<Grid item lg={12}>
		    <Button
		      color="primary"
		      variant="contained"
		      onClick={()=>{
			 if( path === '' ) return;
			 dispatch( CreateBackup({path}) );
		      }}
		    >Backup</Button>
		</Grid> 
	    </Grid>
	</div>
    );
}

export default Backup;

