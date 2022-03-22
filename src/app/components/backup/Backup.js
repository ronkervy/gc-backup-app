import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  InputBase,
  Typography
} from '@mui/material';
import {
   Settings,
   Backup as BackupIcon,
   Storage,
   Restore
} from '@mui/icons-material'
import { motion } from 'framer-motion';
import { BackupList, CreateBackup } from '../../store/backup.services';
import Loader from '../../shared/Loader';

function Backup() {
    
    const [path,setPath] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.backups);

    if( loading ){
       return(
	  <Loader />
       )
    }

    return(
	 <Grid 
	    container 
	    className="backupPage"
	 >
	    <Box
	       boxShadow={4}
	       component={motion.div} 
	       md={4} 
	       className="backupBox"
	       initial={{ y: -30, opacity: 0 }}
	       animate={{ y: 0, opacity: 1, transition: { duration: .5 } }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	       whileTap={{ scale: 1 }}
	       onClick={()=>console.log("Quick Backup")}
	    >
	       <Typography color="white" variant="h6">Quick Backup</Typography>
	       <BackupIcon style={{ fontSize: 90 }} color="action" />
	       <p className="description">Quick backup database,<br /> default backup location <br />is in "C:/backups"</p>
	    </Box>
	    <Box
	       boxShadow={4}
	       md={4} 
	       className="backupBox"
	       component={motion.div}
	       initial={{ y: -30, opacity: 0 }}
	       animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	       whileTap={{ scale: 1 }}
	       onClick={()=>console.log("Restore Backup")}
	    >
	       <Typography color="white" variant="h6">Restore Backup</Typography>
	       <Restore style={{ fontSize: 90 }} color="action" />
	       <p className="description">Select from recent backups <br />and restore database <br />to its normal state.</p>
	    </Box>
	    <Box 
	       boxShadow={4}
	       md={4} 
	       className="backupBox"
	       component={motion.div}  
	       initial={{ y: -30, opacity: 0 }}
	       animate={{ y: 0, opacity: 1, transition: { duration: 1.5 }  }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	       whileTap={{ scale: 1 }}
	       onClick={()=>console.log('Custom Backup')}
	    >
	       <Typography color="white" variant="h6">Custom Backup</Typography>
	       <Storage style={{ fontSize: 90 }} color="action" />
	       <p className="description">Customize backups <br />to a specified <br />backup folder</p>
	    </Box>
	 </Grid>
    );
}

export default Backup;
