const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    prefered_category: {
      type: DataTypes.ENUM,
      allowNull: false,
  },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = User;