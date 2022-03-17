import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import DbItems from './DbItems';
import { DbList } from '../../store/backup.services';

function DatabaseList() {
      
      const dispatch = useDispatch();
      const [items,setItems] = useState([]);
      const { entities: backups, loading } = useSelector(state=>state.backups);

      useEffect(()=>{
	 setItems(backups);
      },[]);

      if(loading || items.length === 0){
	 return <div>loading...</div>
      }

      return(
	 <Grid container className="databasePage">
	   <DbItems items={items} /> 
	 </Grid>
      );
}

export default DatabaseList;

