const { Sequelize } = require('sequelize');
const path = require('path');
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function mongoConnect(){
    try{
	let con = await client.connect();
	return con;
    }catch(err){
	return err;
    }
}

let storagePath = process.env.NODE_ENV == "development" ? path.join(__dirname,'/database.sqlite') : path.join(__dirname,'/database.sqlite').replace('app.asar','app.asar.unpacked')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath
});

db.sync({ force: true });

module.exports = { db,mongoConnect };
