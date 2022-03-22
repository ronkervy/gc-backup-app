const BackupModel = require('../models/app.model');
const { execFileSync } = require('child_process');
const createHttpError = require('http-errors');
const path = require('path');
const { mongoConnect } = require('../../config/db.config');
const cron = require('node-cron');
const { opendir,open,stat,access,readdir,lstat } = require('fs/promises');
const { constants } = require('fs');

 
module.exports = {

    ListDatabases: async(req,res,next)=>{
	try{
	  const con = await mongoConnect();
	  const resultDB = await con.db().admin().listDatabases();
	  const dbNames = [];
	  const dbCollections = [];
  
	  resultDB["databases"].map( async(db,i)=>{
	      dbNames.push({id: i,name: db.name,sizeOfDb: db.sizeOnDisk / 1048576});
	  });

	  Promise.all(
	    dbNames.map(async(db,i)=>{
	      const resColl = await con.db(db.name).listCollections().toArray();
	      return {...resColl,dbName: db.name};
	    })
	  ).then(collections=>{
	      const { totalSize,totalSizeMb } = resultDB;
	      res.status(200).json({
		  ...collections,
		  databases: dbNames,
		  dbCount: dbNames.length,
		  sizeOfDb: totalSizeMb + ' MB',
	      });
	  });
	}catch(err){
	    return next(createHttpError.Unauthorized({
		error: err.message
	    }));
	}
    },
    
    BackupList: async(req,res,next)=>{ 
	 const { file_path: fpath } = req.query;
	 let fh = null;
	 let dirPath = fpath !== undefined ? fpath : path.join(__dirname,'../../backups')
	 const folder_files = await readdir(dirPath);
	 let files = [];
	 console.log(dirPath);
	 try{
	    
	    for (let file of folder_files){
	       let stats = await lstat(`${dirPath}/${file}`);
	       files.push({
		  isDirectory: !stats.isFile(),
		  file_name: file,
		  stats
	       });
	    };

	    return res.status(200).json({
	       files
	    });
	 }catch(err){
	    return res.status(200).json({
	       files,
	       err
	    });
	 }
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

    WeeklyBackup: async(req,res,next)=>{
	try{
	    await cron.schedule('0 8 */7 * *',()=>{
		console.log('working weekly');
	    });
	    return res.status(200).json({
		message: "Weekly Backup Running."
	    });
	}catch(err){
	    return next(createHttpError.NotFound({
		message: err
	    }));
	}
    },

    MonthlyBackup: async(req,res,next)=>{
	try{
	    cron.schedule('0 0 1 * *', ()=>{
		console.log('Monthly Backup is active.');
	    })	  
	}catch(err){
	    return next();
	}
    },

    DeleteBackup: async()=>{

    }

}
