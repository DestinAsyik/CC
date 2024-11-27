module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefered_category: {
      type: DataTypes.ENUM(
        'Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
        'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
        'Belanja', 'Alam', 'Rekreasi', 'Religius'
      ),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  // Relasi dengan tabel lain
  User.associate = function (models) {
    User.hasMany(models.Likes, { foreignKey: 'user_id' });
    User.hasMany(models.Bookmark, { foreignKey: 'user_id' });
    User.hasMany(models.Review, { foreignKey: 'user_id' });
  };

  return User;
};