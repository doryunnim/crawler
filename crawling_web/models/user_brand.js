module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_brand', {
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          brand_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
          }
  });
};
  


