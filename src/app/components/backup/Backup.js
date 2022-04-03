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
import { useNavigate } from 'react-router-dom';

function Backup() {
    
    const [path,setPath] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.backups);
    const { entities: settings } = useSelector(state=>state.settings);
    const [dir,SetDir] = useState('');
    const navigate = useNavigate();

    const handleQuickBackup = ()=>{
       navigate('/backups/quick',{ state: {...settings} });
    }

    const handleRestoreBackup = ()=>{
       navigate('/backups/restore');
    }
    
    const handleCustomBackup = ()=>{
       navigate('/backups/custom',{ state: {...settings} });
    }
   
    useEffect(()=>{
       SetDir(settings.backupPath);
    },[]);

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
	       onClick={handleQuickBackup}
	    >
	       <Typography color="white" variant="h6">Quick Backup</Typography>
	       <BackupIcon style={{ fontSize: 90 }} color="action" />
	       <p className="description">Quick backup database,<br /> default backup location <br />is in "C:/User/Downloads"</p>
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
	       onClick={handleRestoreBackup}
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
	       onClick={handleCustomBackup}
	    >
	       <Typography color="white" variant="h6">Custom Backup</Typography>
	       <Storage style={{ fontSize: 90 }} color="action" />
	       <p className="description">Customize backups <br />to a specified <br />backup folder</p>
	    </Box>
	 </Grid>
    );
}

export default Backup;
