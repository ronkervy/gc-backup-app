import React from 'react';
import { 
   Grid
} from '@mui/material'
import { motion } from 'framer-motion';

function Loader() {
   return(
      <Grid 
	 container 
	 className="spinner-wrap"
	 component={motion.div}
	 initial={{ opacity: 0 }}
	 animate={{ opacity: 1 }}
	 transition={{ duration: .2 }}
      >
	 <Grid item md={12} sm={12} className="spinner">
	 </Grid>
      </Grid>
   );
}

export default Loader;

