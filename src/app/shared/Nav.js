import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

function Nav() {
      return(
	 <Grid container>
	    <Grid item lg={12} sm={12}>
	       <ul className="mainnav">
		  <li>
		     <NavLink to="/" className="navItems">Backup Options &nbsp; &nbsp;</NavLink>
		  </li>
		  <li>
		     <NavLink to="/backups/database" className="navItems">Database List &nbsp; &nbsp;</NavLink>
		  </li>
		  <li>
		     <NavLink to="/settings" className="navItems">Settings </NavLink>
		  </li>
	       </ul>
	    </Grid>
	 </Grid>
      );
}

export default Nav;

