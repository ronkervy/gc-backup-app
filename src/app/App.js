import React,{ useEffect } from 'react';
import { 
  Grid,
  Button,
  InputBase
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import BackupList from './components/BackupList';
import SettingsPage from './components/SettingsPage';
import Backup from './components/Backup';
import Nav from './shared/Nav';

function App() {
   return(
      <Grid container className="App">
	 <Nav />
	 <Routes>
	    <Route path="/" element={<Backup />} />
	    <Route path="/backups/database" element={<BackupList />} />
	    <Route path="/settings" element={<SettingsPage />} />
	 </Routes>
      </Grid>
      
   )
}

export default App;

