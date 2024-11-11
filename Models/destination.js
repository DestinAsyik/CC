const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Destination = sequelize.define('destination', {
    item_id: {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM('Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
        'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
        'Belanja', 'Alam', 'Rekreasi', 'Religius'),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
     type: DataTypes.FLOAT,
     allowNull: false,
    },
    longitude: {
     type: DataTypes.FLOAT,
     allowNull: false,
    },
    coordinate: {
     type: DataTypes.STRING,
     allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  
  module.exports = Destination;