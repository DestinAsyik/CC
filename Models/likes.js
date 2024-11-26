module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
      like_id: {
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
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    Likes.associate = function (models) {
      Likes.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      Likes.belongsTo(models.Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
    };
  
    return Likes;
  };  