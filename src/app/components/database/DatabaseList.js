import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import DbItems from './DbItems';
import { DbList } from '../../store/db.services';

function DatabaseList() {
      
      const dispatch = useDispatch();
      const [items,setItems] = useState([]);
      const { entities: backups, loading } = useSelector(state=>state.backups);
      const { entities: databases } = useSelector(state=>state.dbase);

      useEffect(()=>{
	 setItems(databases);
	 dispatch(DbList());
      },[]);

      if(loading || items.length === 0){
	 return <div>loading...</div>
      }

      return(
	 <Grid container className="databasePage">
	   <DbItems items={databases} /> 
	 </Grid>
      );
}

export default DatabaseList;

