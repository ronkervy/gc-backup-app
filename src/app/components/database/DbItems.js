import React from 'react';
import { Grid,Typography } from '@mui/material'
import { motion } from 'framer-motion';
import {
   Settings,
   Backup as BackupIcon,
   Storage,
   Delete
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { CreateBackup } from '../../store/backup.services';

function DbItems(props) {
   
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { entities: config } = useSelector(state=>state.settings);
   const [settings,setSettings] = React.useState([]);
   const { items } = props;
   
   const handleSingleBackup = (dbName)=>{
       navigate('/backups/single',{state: {...settings,dbName}});
   }

   React.useEffect(()=>{
      setSettings(config);
   },[]);

   return(
      <>
	 {items.databases.map((dbname,i)=>{
	    return(
	       <Grid 
		  component={motion.div}
		  boxShadow={3} 
		  className="dbitems" 
		  key={i} 
		  item 
		  md={12} 
		  sm={12}
		  whileHover={{ scale: 0.98, x: 2, transition: { duration: .3 } }}
		  initial={{ x: -100, opacity: 0 }}
		  animate={{ x: 0,opacity: 1, transition: { duration: (i + 1) * .5 } }}
		  onClick={()=>{
		     handleSingleBackup(dbname.name);
		  }}
	       >
		  <Storage color="action" className="list-icon" />
		  <Typography 
		     variant="span"
		     style={{ width: "60px",borderRight: "2px solid #233155" }}
		  >{`${dbname.name}`}</Typography>
		  <Typography style={{ paddingLeft: "5px" }}>{`Size: ${dbname.sizeOfDb}`}</Typography>
	       </Grid>
	    );
	 })}
      
      </>
   );
}

export default DbItems;

