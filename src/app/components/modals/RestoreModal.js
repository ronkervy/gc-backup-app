import React from 'react';
import {
   Grid,
   Modal,
   Fade,
   Backdrop,
   Button,
   TextField,
   InputAdornment,
   Typography
} from '@mui/material';
import { Eject,Storage } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RestoreBackup,BackupList } from '../../store/backup.services';
import { useDispatch,useSelector } from 'react-redux';
import Ring from '../../shared/Ring';

function RestoreModal() {

   const dispatch = useDispatch();
   const { entities: backups,loading } = useSelector(state=>state.backups);
   const [open,setOpen] = React.useState(false);
   const [path,setPath] = React.useState('');
   const navigate = useNavigate();   

   const handleClose = ()=>{
      navigate(-1);
      setOpen(false)
   };

   const handleRestoreBackup = ()=>{
      if(path == '') return;
      dispatch(RestoreBackup({
	 path,
	 dbList: []
      }));
   }

   React.useEffect(()=>{
      setOpen(true);
   },[]);

   return(
      <Modal
	 open={open}
	 onClose={handleClose}
	 closeAfterTransition  
         BackdropComponent={Backdrop}
	 BackdropProps={{
	    timeout: 500,
	    style: { WebkitAppRegion: "no-drag" }
	 }}
      >
	 <Fade
	    in={open}
	 >
	    <Grid
	       display="flex"
	       justifyContent="center"
	       container
	       className="backupModal"
	    >
	       <Grid
		  item
		  md={12}
		  sm={12}
		  display="flex"
		  flexDirection="column"
		  justifyContent="center"
		  alignItems="center"
	       >
		  {loading ? (
		     <Typography align="center" style={{ color: "white" }} variant="p">
			Restoring from backup<br />
			Please wait...
		     </Typography>
		  ) : (
		     <Typography align="center" style={{ color: "white" }} variant="p">
			Select a folder that <br />have all of your recent backups.
		     </Typography>
		  )}
	       </Grid>
	       <Grid 
		  item 
		  md={12} 
		  sm={12}
		  display="flex"
		  flexDirection="column"
		  justifyContent="center"
		  alignItems="center"
	       >
		  {loading ? (
		     <Ring />
		  ) : (
		     <TextField
			variant="outlined"
			size="small"
			value={path}
			label="Backup Folder"
			InputLabelProps={{
			   style: { color: "white", outlineColor: "white !important" }
			}}
			InputProps={{
			   startAdornment: <InputAdornment position="start"><Eject style={{ color: "white" }} /></InputAdornment>,
			   style: { color: "white" }
			}}
			onClick={async()=>{
			   const res = await DialogAPI.OpenDialog();
			   dispatch(BackupList(res));
			   setPath(res);
			}}
		     />
		  )}
	       </Grid>
	       <Grid 
		  item 
		  md={12} 
		  sm={12}
		  display="flex"
		  justifyContent="center"
		  alignItems="center"
	       >
		  <Button
		     variant="contained"
		     color="primary"
		     onClick={handleRestoreBackup}
		  >
		     Restore
		  </Button>&nbsp;
		  <Button
		     variant="contained"
		     color="secondary"
		     onClick={handleClose}
		  >
		     Cancel
		  </Button>
	       </Grid>
	    </Grid>
	 </Fade>
      </Modal>
   )
}

export default RestoreModal;

