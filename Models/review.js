const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_URL)

const Destination = require('./destination')
const User = require('./user')

const Review = sequelize.define('review', {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Destination,
        key:'name',
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'username',
      }
    },
    rating: {
      type: DataTypes.FLOAT,
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

  Review.belongsTo(Destination, { foreignKey: 'name', onDelete: 'CASCADE' });
  Destination.hasMany(Review, { foreignKey: 'name' });
  
  Review.belongsTo(User, { foreignKey: 'username', onDelete: 'CASCADE' });
  User.hasMany(Review, { foreignKey: 'username' });
  
  module.exports = Review;