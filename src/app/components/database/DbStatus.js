import React from 'react';
import { motion } from 'framer-motion';
import {
   Grid,
   Box
} from '@mui/material';
function DbStatus(props) {

   const { stats } = props;

   React.useEffect(()=>{

   },[])

   return(
      <Grid
	 container
	 className="dbstatus-wrap"
	 boxShadow={4}
	 component={motion.div}
      >
	 <Grid className="content-stat-wrap" item container md={4} sm={4}>
	    <Grid item md={2}>
	       <span className="statCount">{stats.sizeOfDb}</span>
	    </Grid>
	    <Grid item md={2}>
	      <p className="statDesc">Size of databases</p> 
	    </Grid>
	 </Grid>
	 <Grid className="content-stat-wrap" item container md={4} sm={4}>
	    <Grid item md={2}>
	       <span className="statCount">{stats.dbCount}</span>
	    </Grid>
	    <Grid item md={2}>
	      <p className="statDesc">Count of <br /> running database</p> 
	    </Grid>
	 </Grid>
	 <Grid className="content-stat-wrap" item container md={4} sm={4}>
	    <Grid item md={2}>
	       <span className="statCount">1</span>
	    </Grid>
	    <Grid item md={2}>
	      <p className="statDesc">Number of <br />server running</p> 
	    </Grid>
	 </Grid>
      </Grid>
   );
}

export default DbStatus;

