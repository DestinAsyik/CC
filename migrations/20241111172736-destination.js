'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('destination', {
      item_id: {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      place_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gambar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM('Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari',
          'Pusat Perbelanjaan', 'Tempat Ibadah', 'Agrowisata',
          'Belanja', 'Alam', 'Rekreasi', 'Religius'),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating_avg: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      latitude: {
       type: Sequelize.FLOAT,
       allowNull: false,
      },
      longitude: {
       type: Sequelize.FLOAT,
       allowNull: false,
      },
      coordinate: {
       type: Sequelize.STRING,
       allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
