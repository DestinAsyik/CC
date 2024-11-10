const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const User = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.ENUM('Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
        'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata', 'Belanja',
        'Alam', 'Rekreasi', 'Religius'),
      allowNull: false,
  },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = User;