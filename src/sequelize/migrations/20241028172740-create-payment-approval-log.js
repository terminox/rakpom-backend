'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentApprovalLogs', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      paymentLogID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'PaymentLogs',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('approved', 'rejected'),
        allowNull: false,
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
    await queryInterface.dropTable('PaymentApprovalLogs')
  }
};
