const BackupModel = require('../models/app.models');
const { execFileSync } = require('child_process');
const createHttpError = require('http-errors');
const path = require('path');
const { mongoConnect } = require('../../config/db.config');


module.exports = {

    ListDatabases: async(req,res,next)=>{
	try{
	  const con = await mongoConnect();
	  const resultDB = await con.db().admin().listDatabases();
	  const dbNames = [];
	  const dbCollections = [];

	  resultDB["databases"].map((db,i)=>{
	      dbNames.push(db.name);
	  });

	  dbNames.map(async(name,i)=>{  
	      await con.db(name).listCollections().toArray().then(resCollections=>{
		  dbCollections.push(resCollections);
	      });
	  });

	  console.log(dbCollections);

	  return res.status(200).json({
	      ...resultDB,
	      dbCollections,
	      dbNames
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
	    const { path } = req.body;
	    let execPath = path.join(__dirname,'../../lib/mongodump.exe');
	    const resBackup = await execFileSync(execPath,[`/gzip`,`/db:airbnb`,`/out:./`]);
	    if( resBackup ){
		res.status(201).json({
		    payloadType: typeof(resBackup),
		    resBackup
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
	  const { path } = req.body;
	  let execPath = path.join(__dirname,'../../lib/mongorestore.exe');

	}catch(err){
	  
	}
    },

    ScheduleBackup: async()=>{

    },

    DeleteBackup: async()=>{

    }

}
