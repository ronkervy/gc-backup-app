import React from 'react';
import {
   Modal,
   Fade,
   Grid,
   Backdrop
} from '@mui/material';
function ResetSettings() {

   const [open,setOpen] = React.useState(false);
   const handleOpen = ()=> setOpen(true);
   const handleClose = ()=> setOpen(false);

   React.useEffect(()=>{
      handleOpen();
   },[]);

   return(
      <Modal
	 open={open}
	 BackdropComponent={Backdrop}
	 BackdropProps={{ timeout: 500 }}
	 closeAfterTransition
      >
	 <Fade
	    in={open}
	 >
	    <Grid container className="backupModal">
	       <Grid item md={12} sm={12}>
		  ITEM
	       </Grid> 
	    </Grid>
	 </Fade>
      </Modal>
   );
}

export default ResetSettings;

