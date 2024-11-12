'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable ('bookmark', {
      bookmark_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    item_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: Destination,
            key: 'item_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bookmark');
  }
};
