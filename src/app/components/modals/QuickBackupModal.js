import React from 'react';
import {
   Backdrop,
   Modal,
   Fade
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
      console.log(state);
   },[]);

   return(
      <Modal
	 open={open}
	 onClose={handleClose}
	 BackdropComponent={Backdrop}
	 BackdropProps={{
	    timeoute: 500,
	    style: { WebkitAppRegion: "no-drag" }
	 }}
	 closeAfterTransition
      >
	 <Fade in={open}>
	    <div>Quick Backup</div>
	 </Fade>
      </Modal> 
   );
}

export default QuickBackupModal;

