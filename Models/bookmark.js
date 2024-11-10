const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const User = require('../Models/user');
const Destination = require('./destination');

const Bookmark = sequelize.define('bookmark', {
    bookmark_id:{
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
});

Bookmark.belongsTo(Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
Destination.hasMany(Bookmark, { foreignKey: 'item_id' });

Bookmark.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Bookmark, { foreignKey: 'user_id' });

module.exports(Bookmark);