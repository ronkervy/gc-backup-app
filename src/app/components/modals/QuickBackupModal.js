import React from 'react';
import {
   Backdrop,
   Modal,
   Fade,
   Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function QuickBackupModal(props) {
   const state = props;
   const [open,setOpen] = React.useState(false);
   const navigate = useNavigate();
   
   const handleClose = ()=>{
      navigate(-1);
      setOpen(false);
   };
   const handleOpen = ()=> setOpen(true);

   React.useEffect(()=>{
      handleOpen();
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
	    >
	       <Grid 
		  item 
		  md={12} 
		  sm={12} 
		  className="quickBackupContent"
	       >
		  TEST
	       </Grid> 
	    </Grid>
	 </Fade>
      </Modal> 
   );
}

export default QuickBackupModal;
