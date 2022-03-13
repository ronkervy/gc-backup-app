import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

function Nav() {
      return(
	 <Grid item lg={12} sm={12} className="mainWrap">
	    <ul className="mainnav">
	       <li>
		  <NavLink to="/" className="navItems">Backup Options</NavLink>
	       </li>
	       <li>
		  <NavLink to="/backups/database" className="navItems">Database List</NavLink>
	       </li>
	       <li>
		  <NavLink to="/settings" className="navItems">Settings</NavLink>
	       </li>
	    </ul>
	 </Grid>
      );
}

export default Nav;

