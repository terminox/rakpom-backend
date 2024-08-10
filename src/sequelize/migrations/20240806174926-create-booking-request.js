'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BookingRequests', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      userID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'UserProfiles',
          key: 'id',
        }
      },
      shopID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Shops',
          key: 'id',
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startHour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startMinute: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      endHour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      endMinute: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BookingRequests')
  }
};
