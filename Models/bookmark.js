module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('Bookmark', {
      bookmark_id: {
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
  
    // Relasi dengan model lain
    Bookmark.associate = function (models) {
      Bookmark.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      Bookmark.belongsTo(models.Destination, { foreignKey: 'item_id', onDelete: 'CASCADE' });
    };
  
    return Bookmark;
  };  