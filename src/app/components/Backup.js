import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  InputBase
} from '@mui/material';
import { motion } from 'framer-motion';
import { BackupList, CreateBackup } from '../store/backup.services';

function Backup() {
    
    const [path,setPath] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.backups);

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
	       animate={{ y: 0, opacity: 1 }}
	       transition={{ duration: .5 }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	    >
	       QUICK BACKUP
	    </Box>
	    <Box
	       boxShadow={4}
	       md={4} 
	       className="backupBox"
	       component={motion.div}
	       initial={{ y: -30, opacity: 0 }}
	       animate={{ y: 0, opacity: 1 }}
	       transition={{ duration: 1 }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	    >
	       RESTORE BACKUP
	    </Box>
	    <Box 
	       boxShadow={4}
	       md={4} 
	       className="backupBox"
	       component={motion.div}  
	       initial={{ y: -30, opacity: 0 }}
	       animate={{ y: 0, opacity: 1 }}
	       transition={{ duration: 1.5 }}
	       whileHover={{ scale: 1.1, transition: { duration: .5}  }}
	    >
	       CUSTOM BACKUP
	    </Box>
	 </Grid>
    );
}

export default Backup;
