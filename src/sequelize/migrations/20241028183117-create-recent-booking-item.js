'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RecentBookingItems', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      userID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shopID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RecentBookingItems')
  }
};
