const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Destination = require('./destination');
const User = require('./user');

const Review = sequelize.define('review', {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Destination,
        key:'item_id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Review.belongsTo(Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
  Destination.hasMany(Review, { foreignKey: 'item_id' });
  
  Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  User.hasMany(Review, { foreignKey: 'user_id' });
  
  module.exports = Review;