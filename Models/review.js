module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Review.belongsTo(models.Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
  };

  return Review;
};