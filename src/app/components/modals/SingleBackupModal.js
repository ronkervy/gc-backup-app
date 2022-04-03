import React from 'react';
import {
   Backdrop,
   Modal,
   Fade,
   Grid,
   ButtonGroup,
   Button,
   Typography,
   CircularProgress
} from '@mui/material';
import { Storage,Backup } from '@mui/icons-material'
import { useNavigate,useLocation } from 'react-router-dom';
import {
   useDispatch,
   useSelector
} from 'react-redux';
import {
   CreateBackup
} from '../../store/backup.services';
import Ring from '../../shared/Ring';
import {motion} from 'framer-motion';
function SingleBackupModal(props) {
   
   const dispatch = useDispatch();
   const { entities: backups,loading } = useSelector(state=>state.backups);
   const location = useLocation();
   const [open,setOpen] = React.useState(false);
   const navigate = useNavigate();
   const { backupPath,dbName } = location.state;
   const handleClose = ()=>{
      navigate(-1);
      setOpen(false);
   };
   
   const handleBackup = ()=>{
      dispatch(CreateBackup({
	 path: backupPath,
	 dbName
      }));
   }

   React.useEffect(()=>{
      console.log(location.state);
      setOpen(true)
   },[]);

   return(
      <Modal
	 open={open}
	 onClose={handleClose}
	 BackdropComponent={Backdrop}
	 BackdropProps={{
	    timeout: 500,
	    style: { WebkitAppRegion: "no-drag" }
	 }}
	 closeAfterTransition
      >
	 <Fade in={open}>
	    <Grid
	       boxShadow={4}
	       container
	       className="backupModal"
	       display="flex"
	       justifyContent="center"
	       alignItems="center"
	    >
	       <Grid 
		  item 
		  md={12} 
		  sm={12} 
		  className="quickBackupContent"
		  display="flex"
		  justifyContent="center"
		  alignItems="center"
		  style={{ flexDirection: "column" }}
	       >
		  {loading ? (
		     <Typography
			color="white" 
			align="center" 
			variant="h6"
		     >
			Backing up {dbName} database.<br />
			Please wait...
		     </Typography>
		  ) : (
		     <Typography 
			color="white" 
			align="center" 
			variant="h6"
		     >
			This will backup {dbName} database.
		     </Typography>
		  )}
	       </Grid>
	       <Grid 
		  display="flex" 
		  flexDirection="column" 
		  justifyContent="center"
		  alignItems="center"
		  item md={12} sm={12}
	       >
		  {loading ? <Ring /> : <Backup style={{ fontSize: "80px"}} color="action" />}
	       </Grid>
	       <Grid 
		  item 
		  justifyContent="center" 
		  display="flex" 
		  md={12} sm={12}
	       >
		  <Button
		     variant="contained" 
		     color="primary"
		     onClick={handleBackup}
		  >Proceed</Button>&nbsp;
		  <Button 
		     variant="contained" 
		     color="secondary"
		     onClick={handleClose}
		  >Cancel</Button>
	       </Grid>
	    </Grid>
	 </Fade>
      </Modal> 
   );
}

export default SingleBackupModal;
