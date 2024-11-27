'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable ('Likes', {
      like_id:{
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
        name: 'fk_likes_user',
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
        name: 'fk_likes_item',
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};
