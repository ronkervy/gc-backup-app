import React from 'react';
import {
   Backdrop,
   Modal,
   Fade,
   Grid,
   ButtonGroup,
   Button,
   Typography,
   CircularProgres,
   FormLabel,
   Checkbox,
   FormControl,
   FormControlLabel,
   FormGroup,
   Box
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

function CustomBackupModal(props) {
   
   const dispatch = useDispatch();
   const { entities: backups,loading } = useSelector(state=>state.backups);
   const { entities: dbase,loading: dbaseLoading } = useSelector(state=>state.dbase);

   const location = useLocation();
   const [open,setOpen] = React.useState(false);
   const [db,setDb] = React.useState([]);
   const [selectedDb,setSelectedDb] = React.useState([]);

   const navigate = useNavigate();
   
   const handleClose = ()=>{
      navigate(-1);
      setOpen(false);
   };

   const handleChange = (e,obj)=>{
      setDb(state=>{
	 return [
	    ...state.map(item=>{
	       if( item.id !== obj.id ) return {...item}
	       return {
		  ...item,
		  active: !obj.active
	       }
	    })
	 ]	 
      });
   }
   
   const handleBackup = ()=>{
      if( selectedDb.length <= 0 ) return;
      const { backupPath } = location.state;
      dispatch(CreateBackup({
	 path: backupPath,
	 dbList: selectedDb
      }));
   }

   const initList = ()=>{
      if( dbase.databases.length > 0 ){
	 dbase.databases.map((dbItem,i)=>{
	    setDb(state=>{
	       return [
		  ...state.filter(item=>item.name !== "config"),
		  {...dbItem,active:false}
	       ]
	    });
	 });
      }
   }

   React.useEffect(()=>{
      initList();
      setOpen(true)
   },[]);

   React.useEffect(()=>{
      const res = db.filter(item=>item.active === true);
      setSelectedDb([...res.map(item=>item.name)]); 
   },[db]);

   React.useEffect(()=>{
      console.log(selectedDb);
   },[selectedDb]);

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
		  flexDirection="row"
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
			Backing up all database.<br />
			Please wait...
		     </Typography>
		  ) : (
		     <Typography 
			color="white" 
			align="center" 
			variant="h6"
		     >
			Select the database<br />you want to backup.
		     </Typography>
		  )}
	       </Grid>
	       <Grid 
		  display="flex" 
		  flexDirection="row" 
		  justifyContent="center"
		  alignItems="center"
		  item md={12} sm={12}
	       >
		  {loading ? <Ring /> : db.map(item=>(
		     <FormControlLabel
			key={item.id}
			style={{ color: "white", fontSize: "12px" }}
			control={
			   <Checkbox
			      style={{ color: "white" }}
			      onChange={(e)=>{
				 handleChange(e,item);
			      }} 
			      checked={item.active} 
			      name={item.name}
			   />
			}
			label={item.name}
		     />
		  ))}
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

export default CustomBackupModal;

