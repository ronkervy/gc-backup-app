const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const createHttpError = require('http-errors');
const path = require('path');

const AppRoutes = require('./routes/app.routes');
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3000/main_window',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3000/main_window'
];

const opt = {
  origin : (origin,cb)=>{
    if(whitelist.indexOf(origin) !== -1 || !origin){
	cb(null,true);
    }else{
	cb(new Error("Not Allowed By CORS."))
    }
  },
  methods: ['GET','POST','PUT','PATCH','OPTIONS']
}

const app = express();

app.use(helmet());
app.use(cors(opt));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1',AppRoutes);

app.use((req,res,next)=>{
    next(createHttpError.NotFound());
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error : {
            status : err.status,
            message : err.message
        }
    });
});

app.listen(8081);
