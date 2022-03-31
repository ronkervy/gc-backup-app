import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
   Settings,
   Dashboard,
   Storage
} from '@mui/icons-material';

function Nav() {
      return(
	 <Grid item lg={12} sm={12} className="navWrap">
	    <ul className="mainnav">
	       <li className="nav-icon-wrap">
		  <Dashboard style={{ color: 'white' }} /><NavLink to="/" className="navItems">Dashboard</NavLink>
	       </li>
	       <li className="nav-icon-wrap">
		  <Storage style={{ color: 'white' }}  /><NavLink to="/backups/database" className="navItems">Database List</NavLink>
	       </li>
	       <li className="nav-icon-wrap">
		  <Settings style={{ color: 'white' }}  /><NavLink to="/settings" className="navItems">Settings</NavLink>
	       </li>
	    </ul>
	 </Grid>
      );
}

export default Nav;

