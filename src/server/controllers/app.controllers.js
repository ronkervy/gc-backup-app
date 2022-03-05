const BackupModel = require('../models/app.models');
const { execFileSync } = require('child_process');
const createHttpError = require('http-errors');
const path = require('path');
const { mongoConnect } = require('../../config/db.config');
const cron = require('node-cron');

module.exports = {

    ListDatabases: async(req,res,next)=>{
	try{
	  const con = await mongoConnect();
	  const resultDB = await con.db().admin().listDatabases();
	  const dbNames = [];
	  const dbCollections = [];
  
	  resultDB["databases"].map( async(db,i)=>{
	      dbNames.push(db.name);
	  });

	  Promise.all(
	    dbNames.map(async(name,i)=>{
	      const resColl = await con.db(name).listCollections().toArray();
	      return {...resColl,dbName: name};
	    })
	  ).then(collections=>{
	      const { totalSize,totalSizeMb } = resultDB;
	      console.log(totalSizeMb);
	      res.status(200).json({
		  databases: dbNames,
		  dbCount: dbNames.length,
		  sizeOfDb: totalSizeMb + ' MB',
		  ...collections
	      });
	  });

	  	  

	}catch(err){
	    return next(createHttpError.Unauthorized({
		error: err.message
	    }));
	}
    },
    
    ListBackups: async(req,res,next)=>{
	res.status(200).json({
	  backups : "List of backups"
	});
    },
    
    CreateBackup: async(req,res,next)=>{
	try{
	    const { path: fpath } = req.body;
	    let filePath =  fpath !== '' ? fpath : path.join(__dirname,'./backups');
 	    let execPath = path.join(__dirname,'../../lib/mongodump.exe');
	    const resBackup = await execFileSync(execPath,[`/gzip`,`/db:airbnb`,`/out:${filePath}`]);
	    if( resBackup ){
		res.status(201).json({
		    payloadType: typeof(resBackup),
		    resBackup,
		    message: 'Backup Complete'
		});
	    }else{
		return next(createHttpError.BadRequest({
		  resBackup
		}));
	    }
	}catch(err){
	    return next(createHttpError.NotFound());
	}
    },
    
    RestoreBackup: async(req,res,next)=>{
	try{
	  const { path: fPath } = req.body;
	  const filePath = fPath !== '' ? fPath : path.join(__dirname,'./backups');
	  let execPath = path.join(__dirname,'../../lib/mongorestore.exe');
	  const resRestore = await execFileSync(execPath,[`/db:airbnb`,`/dir:${filePath}`,`/gzip`]);
	  if(resRestore){
	      res.status(200).json({
		  resRestore,
		  message: 'Restore Complete'
	      });
	  }else{
	      return next(createHttpError.InternalServerError({
		  message: 'Error restoring from backup.'
	      }));
	  }
	}catch(err){
	      return next(createHttpError.InternalServerError({
		  message: err
	      }));
	}
    },

    ScheduleBackup: async()=>{

    },

    DeleteBackup: async()=>{

    }

}
