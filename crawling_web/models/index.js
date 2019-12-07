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
db.User_Brand=require('./user_brand')(sequelize, Sequelize);
db.Like=require('./like')(sequelize, Sequelize);

//user brand_list N:N(관심목록 추가) =>새로운 모델이 생김
// db.User.belongsToMany(db.Brand,{
//   through:'user_brand',
//   foreignkey:'user_id',
// });
// db.Brand.belongsToMany(db.User,{
//   through:'user_brand',
//   foreignkey:'brand_id',
// });


// db.User_Brand.belongsTo(db.User,{
//   foreignkey:'user_id'
// });
// db.User_Brand.belongsTo(db.Brand,{
//   foreignkey:'brand_id'
// });


module.exports = db;
