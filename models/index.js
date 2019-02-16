'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // sequelize = new Sequelize(process.env[config.use_env_variable], {
  //   username: "skapqcfrmvdcdm",
  //   password: "51a18033264772ed5e8faa795356bc74f14eb88d75bb5cfbebc3a4637eb02f01",
  //   database: "d5ror6g774l4tt",
  //   host: "ec2-54-243-223-245.compute-1.amazonaws.com",
  //   dialect: "postgres",
  //   loggin: true,
  //   port: 5432
  // });
  
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
