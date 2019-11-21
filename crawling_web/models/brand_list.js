module.exports = (sequelize, DataTypes) => {
    return sequelize.define('brand_list', {
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
  