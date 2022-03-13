import React from 'react';
import { motion } from 'framer-motion';
import {
   Grid,
   Box
} from '@mui/material';
function DbStatus(props) {

   const { stats } = props;

   return(
      <Grid
	 container
	 className="dbstatus-wrap"
	 boxShadow={4}
	 component={motion.div}
      >
	TEST 
      </Grid>
   );
}

export default DbStatus;

