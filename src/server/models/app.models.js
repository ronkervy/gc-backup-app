const db = require('../../config/db.config');
const { DataTypes } = require('sequelize');
const BackupModel = db.define('Backup', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    }
},{ timestamps: true });

module.exports = BackupModel;
