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
import QuickBackupModal from './components/modals/QuickBackupModal';
import RestoreModal from './components/modals/RestoreModal';
import CustomBackupModal from './components/modals/CustomBackupModal';
import SingleBackupModal from './components/modals/SingleBackupModal';

function App() {

   const dispatch = useDispatch();
   const [stats,setStats] = useState([]);
   const [settings,setSettings] = useState([]);
   const [cronLog,setCronLog] = useState('');
   const { entities,loading } = useSelector(state=>state.backups);
   const { entities: config,loading: settingsLoading } = useSelector(state=>state.settings);
   const { loading: dbaseLoading } = useSelector(state=>state.dbase);
   
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
	 await ConfigAPI.CronJob(res.payload);
	 dispatch(BackupList(res.payload.backupPath));
      }
   }

   useEffect(()=>{
      getList();
      initSettings();
      ConfigAPI.CronLog(
	 "cron:log",
	 (data)=>{
	    setCronLog(data);
	 }
      ); 
   },[]);

   useEffect(()=>{
      console.log(cronLog);
   },[cronLog]);

   return(
      <Grid container className="App">
	 <NavTop />
	 <Nav />
	 <DbStatus stats={stats} />
	 <Grid className="content page" item container md={12} sm={12}>
	    <Routes>
	       <Route path="/" element={<Backup />} />
	       <Route path="/backups/database" element={<DatabaseList />} />
	       <Route path="/backups/quick" element={<QuickBackupModal />} />
	       <Route path="/backups/restore" element={<RestoreModal />} />
	       <Route path="/backups/custom" element={<CustomBackupModal />} />
	       <Route path="/backups/single" element={<SingleBackupModal />} />
	       <Route path="/settings" element={<SettingsPage />} />
	    </Routes>
	 </Grid> 
      </Grid>
      
   )
}

export default App;

