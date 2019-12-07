module.exports = (sequelize, DataTypes) => {
    return sequelize.define('like', {
        user_email: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(300),
          },
          brand_name: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(300),
          },
  },
  {
    timestamps: false,
  });
};
  


