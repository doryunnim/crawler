module.exports = (sequelize, DataTypes) => {
  return sequelize.define('event', {
    brand_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
    },
    content: {
      type: DataTypes.STRING(9000),
    },
    main_img: {
      type: DataTypes.STRING(900),
    },
    sub_img: {
      type: DataTypes.STRING(900),
    },
    date: {
      type: DataTypes.STRING(100),
    },
  }, {
    timestamps: false,
  });
};
