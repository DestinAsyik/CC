module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    place_name: {
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
      type: DataTypes.ENUM(
        'Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
        'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
        'Belanja', 'Alam', 'Rekreasi', 'Religius'
      ),
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
    rating_count: {
      type: DataTypes.INTEGER,
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
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  // Relasi dengan model lain
  Destination.associate = function (models) {
    Destination.hasMany(models.Likes, { foreignKey: 'item_id' });
    Destination.hasMany(models.Bookmark, { foreignKey: 'item_id' });
    Destination.hasMany(models.Review, { foreignKey: 'item_id' });
  };

  return Destination;
};