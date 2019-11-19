'use strict';
module.exports = (sequelize, DataTypes) => {
  const brand_list = sequelize.define('brand_list', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    main_img: DataTypes.STRING,
    sub_ing: DataTypes.STRING,
    brand: DataTypes.STRING
  }, {});
  brand_list.associate = function(models) {
    // associations can be defined here
  };
  return brand_list;
};