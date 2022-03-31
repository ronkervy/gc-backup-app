import React from 'react';
import { 
   Grid,
   TextField,
   MenuItem,
   Button,
   ButtonGroup,
   Table,
   TableContainer,
   TableHead,
   TableBody,
   TableCell,
   TableRow,
   InputAdornment
} from '@mui/material';
import Reset from './modals/ResetSettings';
import { ResetSettings } from '../store/settings.services';
import {
   Folder,
   Assignment,
   ArrowBack
} from '@mui/icons-material'

import { Eject } from '@mui/icons-material';
import { GetSettings,SetSettings } from '../store/settings.services';
import { useSelector,useDispatch } from 'react-redux';
import { BackupList } from '../store/backup.services';
import { motion } from 'framer-motion';
import Loader from '../shared/Loader';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { entities: backups, loading: backupLoading } = useSelector(state=>state.backups);
   const { entities: settings,loading } = useSelector(state=>state.settings);
   
   const [sched,setSched] = React.useState('');
   const [dir,setDir] = React.useState('');
   const [files,setFiles] = React.useState([]);
   const [folderPaths,setFolderPaths] = React.useState([]);

   const handleSchedChange = (e)=>{
      setSched(e.target.value);
   }

   const handleSaveSettings = async()=>{
      const res = await dispatch(SetSettings({
	 ...settings,
	 schedule: sched,
	 backupPath: dir
      }));

       if( SetSettings.fulfilled.match(res) ){
	 dispatch(GetSettings());
	 setDir(res.payload.backupPath);
	 ConfigAPI.CronJob(res.payload);
      }
   }

   const setPaths = (path)=>{
       setFolderPaths(path.replaceAll('\\','/').split('/'));
   }

   const handleBack = ()=>{
      if(folderPaths.length <= 1) return;
      setFolderPaths(state=>{
	 return state.slice(0, -1);
      });
   }

   React.useEffect(()=>{
      dispatch(GetSettings());
      setSched(settings.schedule);
      setDir(settings.backupPath);
      setFiles(backups.files);
      setPaths(settings.backupPath);
   },[]);

   React.useEffect(()=>{
      setDir(folderPaths.toString().replaceAll(',','/'));
   },[folderPaths]);

   React.useEffect(()=>{
      if( dir !== '' ){
	 dispatch(BackupList(dir));
      }
   },[dir]);

   if(loading || settings.length === 0 || files === undefined){
      return <Loader />
   }

   return(
      <Grid 
	 container 
	 className="settingsPage"
	 component={motion.div}
	 initial={{ opacity: 0,y: -50 }}
	 animate={{ opacity: 1, y: 0 }}
	 transition={{ duration: .8 }}
      >
	 <Grid item md={12} sm={12}>
	    <TextField
	       size="small"
	       variant="outlined"
	       fullWidth
	       label="Default Path"
	       value={dir}
	       onClick={async()=>{
		  const resDir = await DialogAPI.OpenDialog();
		  dispatch(BackupList(resDir));
		  setPaths(resDir);
		  setDir(resDir);
	       }}
	       InputProps={{
		  style: {outline: "none", color: "white"},
		  startAdornment: <InputAdornment position="start"><Eject /></InputAdornment>
	       }}
	       
	       InputLabelProps={{
		  style: { color: "white" }
	       }}
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
	       style={{ WebkitAppRegion: "no-drag", outline: "none",paddingRight: "5px" }}
	       InputProps={{
		  style: { color: "white" }
	       }} 
	       InputLabelProps={{
		  style: { color: "white" }
	       }}
	    >
	       {settings.scheduleFormat.map((schedule,i)=>{
		  return(
		     <MenuItem
			className="sel-item"
			value={Object.values(schedule).toString()}
			style={{ WebkitAppRegion: "no-drag"}}
			key={i}
		     >{i == 0 ? 'Weekly' : i == 1 ? 'Monthly' : 'Once a day'}</MenuItem>
		  );
	       })}
	    </TextField>
	 </Grid> 
         <Grid item md={6} sm={6}>
	    <ButtonGroup fullWidth >
	       <Button 
		  fullWidth 
		  variant="contained"
		  onClick={handleSaveSettings}
	       >Save</Button>
	       <Button
		  fullWidth
		  variant="contained"
		  color="secondary"
		  onClick={()=>{
		     dispatch(ResetSettings());
		     dispatch(GetSettings());
		  }}
	       >Reset</Button>
	    </ButtonGroup>
	 </Grid>
	 <Grid 
	    item md={12} 
	    sm={12} 
	    style={
	       { 
		  border: "1px solid #1976D2",
		  borderRadius:"5px",
	       }
	    }
	 >
	    <TableContainer 
		  style={
		     { 
			overFlow: "scroll",
			height: "150px",
			fontSize: ".6em",
			color: "white",
			WebkitAppRegion: "no-drag",
		     }
		  } 
	    >
	       <Table size="small" stickyHeader aria-label="sticky table">
		  <TableHead>
		     <TableRow>
			<TableCell>---</TableCell>
			<TableCell>Filename</TableCell>
			<TableCell>Type</TableCell>
			<TableCell>Size</TableCell>
		     </TableRow>
		  </TableHead>  
		  <TableBody>
		     <TableRow hover >
			<TableCell 
			   colSpan={4} 
			   style={{ cursor: "pointer", color: "white" }}
			   onClick={handleBack}
			>
			   <ArrowBack />
			</TableCell>
		     </TableRow>
		     {backups.files.map((file,i)=>{
			return(
			   <TableRow 
			      hover 
			      key={i}
			      onDoubleClick={async()=>{
				 if(!file.isDirectory) return await DialogAPI.OpenFile(`${file.file_path}/${file.file_name}`);
				 setDir(`${file.file_path}/${file.file_name}`);
				 setPaths(`${file.file_path}/${file.file_name}`);
				 dispatch(BackupList(`${file.file_path}/${file.file_name}`));
			      }}
			   >
			      <TableCell style={{ color: "white" }}>{file.isDirectory ? <Folder /> : <Assignment /> }</TableCell>
			      <TableCell style={{ color: "white", cursor: "pointer" }}>
				 {file.file_name.charAt(0).toUpperCase() + file.file_name.slice(1)}
			      </TableCell>
			      <TableCell style={{ color: "white", cursor: "pointer" }}>
				 {file.isDirectory === true ? "Folder" : file.file_name.split('.')[1]}
			      </TableCell>
			      <TableCell style={{ color: "white", cursor: "pointer" }}>
				 {file.isDirectory == false ? Math.round(file.stats.size / 1024) : '---'}
			      </TableCell>
			   </TableRow>
			);	
		     })}
		  </TableBody>
	       </Table>
	    </TableContainer>
	 </Grid>
      </Grid>
   );
}

export default SettingsPage;

