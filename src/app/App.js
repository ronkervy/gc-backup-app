import React,{ useEffect,useState } from 'react';
import { 
  Grid,
  Button,
  InputBase
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import NavTop from './shared/NavTop';
import DatabaseList from './components/DatabaseList';
import SettingsPage from './components/SettingsPage';
import Backup from './components/Backup';
import Nav from './shared/Nav';
import DbStatus from './components/DbStatus';

function App() {

   const [stats,setStats] = useState([]);

   return(
      <Grid container className="App">
	 <NavTop />
	 <Nav />
	 <DbStatus stats={stats} />
	 <Routes>
	    <Route path="/" element={<Backup />} />
	    <Route path="/backups/database" element={<DatabaseList />} />
	    <Route path="/settings" element={<SettingsPage />} />
	 </Routes>
      </Grid>
      
   )
}

export default App;

