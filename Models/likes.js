const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const User = require('../Models/user');
const Destination = require('./destination');

const Likes = sequelize.define('likes', {
    like_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    item_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Destination,
            key: 'item_id'
        }
    }
},{
    freezeTableName: true,
    timestamps: false,
  });

Likes.belongsTo(Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Destination.hasMany(Likes, { foreignKey: 'item_id' });

Likes.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Likes, { foreignKey: 'user_id' });

module.exports = Likes;