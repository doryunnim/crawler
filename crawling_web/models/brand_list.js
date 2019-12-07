module.exports = (sequelize, DataTypes) => {
  return sequelize.define('brand_lists', {
    brand_id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    brand_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand_img: {
      type: DataTypes.STRING(900),
    }
  }, {
    timestamps: false,
  });
};
