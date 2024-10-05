'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('BookingRequestActions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      bookingRequestID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'BookingRequests',
          key: 'id',
        }
      },
      action: {
        type: Sequelize.ENUM('accept', 'reject'),
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
    queryInterface.dropTable('BookingRequestActions')
  }
};
