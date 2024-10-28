'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameTable('Transactions', 'PendingPaymentItems')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameTable('PendingPaymentItems', 'Transactions')
  }
};
