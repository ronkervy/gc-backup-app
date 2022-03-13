import {Grid} from '@mui/material';
import React from 'react';
import { Circle } from '@mui/icons-material'
import { motion } from 'framer-motion';

function NavTop() {
   return(
      <Grid className="topBtnWrap" item md={12}>
	 <Circle
	    component={motion.svg}
	    initial={{ opacity: 1 }}
	    whileHover={{ opacity: .5 }} 
	    className="topBtn" 
	    style={{color: "#FFD54D" }} 
	    onClick={()=>window.DialogAPI.MinimizeBtn()}
	 />
	 <Circle 
	    component={motion.svg}
	    initial={{ opacity: 1 }}
	    whileHover={{ opacity: .5 }} 
	    className="topBtn" 
	    style={{ color: "#FF4D4D" }} 
	    onClick={()=>window.DialogAPI.CloseBtn()}
	 /> 
      </Grid> 
   );
}

export default NavTop;

