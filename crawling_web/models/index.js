const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize=new Sequelize(
  config.database,config.username,config.password,config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Brand_list=require('./brand_list')(sequelize,Sequelize);
db.Event = require('./event')(sequelize, Sequelize);
db.Like=require('./like')(sequelize, Sequelize);

module.exports = db;