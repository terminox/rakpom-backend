'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Shops', 'shopCode', {
      type: Sequelize.STRING,
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Shops', 'shopCode')
  }
};
