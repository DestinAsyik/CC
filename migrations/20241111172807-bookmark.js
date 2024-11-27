'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable ('Bookmark', {
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
            model: 'Users',
            key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'fk_bookmark_user',
    },
    item_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: 'Destinations',
            key: 'item_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'fk_bookmark_item',
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookmark');
  }
};
