const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Destination = sequelize.define('destination', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_avg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lat: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    long: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    coordinate: {
     type: DataTypes.STRING,
     allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = Destination;