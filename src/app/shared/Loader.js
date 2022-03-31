import React from 'react';
import { 
   Grid
} from '@mui/material'

function Loader() {
   return(
      <div 
	 className="ring-wrap"
      >
	 <div className="ring">
	    Loading
	    <span></span>
	 </div>
      </div>
   );
}

export default Loader;

