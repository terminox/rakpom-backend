'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Shops', 'shopCode', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Shops', 'shopCode')
  }
};
