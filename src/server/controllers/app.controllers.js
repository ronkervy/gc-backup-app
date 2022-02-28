const BackupModel = require('../models/app.models');
const { execFileSync } = require('child_process');
const createHttpError = require('http-errors');
const path = require('path');

module.exports = {
  
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

    ScheduleBackup: async()=>{

    },

    DeleteBackup: async()=>{

    }

}
