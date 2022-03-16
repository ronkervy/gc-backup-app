import React,{ useEffect,useState } from 'react';
import { 
  Grid,
  Button,
  InputBase
} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import NavTop from './shared/NavTop';
import DatabaseList from './components/DatabaseList';
import SettingsPage from './components/SettingsPage';
import Backup from './components/Backup';
import Nav from './shared/Nav';
import DbStatus from './components/DbStatus';
import Loader from './shared/Loader';
import { DatabaseList as DbList } from './store/backup.services';

function App() {

   const [stats,setStats] = useState([]);
   const dispatch = useDispatch();
   const { entities,loading } = useSelector(state=>state.backups);
   
   const getList = async()=>{
      const res = await dispatch(DbList());
      if( DbList.fulfilled.match(res) ){
	 setStats(res.payload);
      }
   }

   useEffect(()=>{
      getList();
   },[]);

   if( loading || stats.length === 0 ){
      return <div>loading...</div>
   }

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

