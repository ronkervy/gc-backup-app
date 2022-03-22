import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import DbItems from './DbItems';
import { DbList } from '../../store/db.services';
import Loader from '../../shared/Loader';

function DatabaseList() {
      
      const dispatch = useDispatch();
      const [items,setItems] = useState([]);
      const { entities: databases, loading } = useSelector(state=>state.dbase);

      useEffect(()=>{
	 setItems(databases);
	 dispatch(DbList());
      },[]);

      if(loading){
	 return(
	    <Loader />
	 )
      }

      return(
	 <Grid container className="databasePage">
	   <DbItems items={databases} /> 
	 </Grid>
      );
}

export default DatabaseList;

