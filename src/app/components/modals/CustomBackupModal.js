import React from 'react';
import {
   Modal,
   Fade,
   Backdrop,
   Grid,
   TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CustomBackupModal() {
   const navigate = useNavigate();
   const [open,setOpen] = React.useState(false);
   
   const handleClose = ()=>{
      navigate(-1);
      setOpen(false);
   }

   React.useEffect(()=>{
      setOpen(true);
   },[]);

   return(
      <Modal
	 open={open}
	 onClose={handleClose}
	 BackdropComponent={Backdrop}
	 BackdropProps={{ 
	    timeout: 500,
	    style: {
	       WebkitAppRegion: "no-drag"
	    }
	 }}
	 closeAfterTransition
      >
	 <Fade in={open} >
	    <Grid container className="backupModal">
	        Custom Modal 
	    </Grid>
	 </Fade>
      </Modal>
   );
}

export default CustomBackupModal;

