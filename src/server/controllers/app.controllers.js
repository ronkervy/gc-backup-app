const BackupModel = require('../models/app.model');
const { execFileSync } = require('child_process');
const createHttpError = require('http-errors');
const path = require('path');
const { mongoConnect } = require('../../config/db.config');
const cron = require('node-cron');
const { mkdir,opendir,open,stat,access,readdir,lstat } = require('fs/promises');
const { constants } = require('fs');
const moment = require('moment');
 
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
	 let dirPath = `${fpath}`;
	 
	 let files = [];
         
	 const folder_files = await readdir(dirPath);
	 try{
	    for (let file of folder_files){
	       let stats = await lstat(`${dirPath}/${file}`);
	       files.push({
		  isDirectory: !stats.isFile(),
		  file_name: file,
		  file_path: `${dirPath}`,
		  file_name_length: file.length,
		  file_ext : path.extname(file),
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
	    const { path: fpath,dbName } = req.body;
	    let filePath =  fpath !== '' ? fpath : path.join(__dirname,'./backups');
 	    let execPath = process.env.NODE_ENV == "development" ? path.join(__dirname,'../../lib/mongodump.exe') : path.join(__dirname,'../../../src/lib/mongodump.exe').replace('app.asar', 'app.asar.unpacked');
	    const params = [`/gzip`,`/out:${filePath}/gc_backup/${moment().format().split('T')[0]}`];
	    console.log(execPath); 
	    if(dbName !== '' || dbName !== undefined){
	       params.push(`/db:${dbName}`);
	    }

	    const resBackup = await execFileSync(execPath,params);
	    if( resBackup ){
		res.status(201).json({
		    payloadType: typeof(resBackup),
		    resBackup,
		    message: 'Backup Complete'
		});
	    }else{
		return next(createHttpError.BadRequest({
	    	    resBackup,
		    message: 'Error creating backup.'
		}));
	    }
	}catch(err){
	    return next(createHttpError.NotFound({
	       err
	    }));
	}
    },
    
    RestoreBackup: async(req,res,next)=>{
	try{
	  const { path: fPath,dbList } = req.body;
	  const filePath = fPath !== '' ? fPath : path.join(__dirname,'./backups');
	  const params = [`/drop`,`/gzip`,`/dir:${filePath}`]
	  
	  let execPath = process.env.NODE_ENV == "development" ? path.join(__dirname,'../../lib/mongorestore.exe') : path.join(__dirname,'../../../src/lib/mongorestore.exe').replace('app.asar','app.asar.unpacked');
	  
	  console.log(execPath);

	  if( dbList.length !== 0 || dbList !== undefined ){
	     dbList.map((dbname,i)=>{
	       params.unshift(`/nsInclude:${dbname}.*`);
	     });
	  }

	  const resRestore = await execFileSync(execPath,params);
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
    }
}
