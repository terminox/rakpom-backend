'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PointTransactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'UserProfiles',
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
    await queryInterface.dropTable('PointTransactions')
  }
};
