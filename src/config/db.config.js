const { Sequelize } = require('sequelize');
const path = require('path');

console.log(path.join(__dirname,'/database.sqlite'));

let storagePath = process.env.NODE_ENV == "development" ? path.join(__dirname,'/database.sqlite') : path.join(__dirname,'/database.sqlite').replace('app.asar','app.asar.unpacked')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath
});

db.sync({ force: true });

module.exports = db;
