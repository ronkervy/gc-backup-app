import React from 'react';
import {
   Grid,
   Modal,
   Fade,
   Backdrop
} from '@mui/material'
import { useNavigate } from 'react-router-dom';

function RestoreModal() {
   const [open,setOpen] = React.useState(false);
   const navigate = useNavigate();   
   const handleOpen = ()=> setOpen(true);
   const handleClose = ()=>{
      navigate(-1);
      setOpen(false)
   };

   React.useEffect(()=>{
      handleOpen(); 
   },[]);

   return(
      <Modal
	 open={handleOpen}
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
	       container
	       className="backupModal"
	    >
	       <Grid item md={12} sm={12}>Restore Modal</Grid>
	    </Grid>
	 </Fade>
      </Modal>
   )
}

export default RestoreModal;

