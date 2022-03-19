import React,{ useEffect,useState } from 'react';
import { 
  Grid,
  Button,
  InputBase
} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import NavTop from './shared/NavTop';
import DatabaseList from './components/database/DatabaseList';
import SettingsPage from './components/SettingsPage';
import Backup from './components/backup/Backup';
import Nav from './shared/Nav';
import DbStatus from './components/database/DbStatus';
import Loader from './shared/Loader';
import { DbList } from './store/db.services';
import { BackupList } from './store/backup.services'
import { GetSettings } from './store/settings.services';

function App() {

   const [stats,setStats] = useState([]);
   const [settings,setSettings] = useState([]);
   const dispatch = useDispatch();
   const { entities,loading } = useSelector(state=>state.backups);
   const { entities: config,loading: settingsLoading } = useSelector(state=>state.settings);
   
   const getList = async()=>{
      const res = await dispatch(DbList());
      if( DbList.fulfilled.match(res) ){
	 setStats(res.payload);
      }
   }

   const initSettings = async()=>{
      const res = await dispatch(GetSettings());
      if( GetSettings.fulfilled.match(res) ){
	 setSettings(res.payload);
	 await dispatch(BackupList(res.payload.backupPath));
      }
   }

   useEffect(()=>{
      getList();
      initSettings();
   },[]);

   if( loading || stats.length === 0 ){
      return <div>loading...</div>
   }

   return(
      <Grid container className="App">
	 <NavTop />
	 <Nav />
	 <DbStatus stats={stats} />
	 <Grid className="content page" item container md={12} sm={12}>
	    <Routes>
	       <Route path="/" element={<Backup />} />
	       <Route path="/backups/database" element={<DatabaseList />} />
	       <Route path="/settings" element={<SettingsPage />} />
	    </Routes>
	 </Grid> 
      </Grid>
      
   )
}

export default App;

