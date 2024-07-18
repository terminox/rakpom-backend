'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Shops', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      shopName: {
        type: Sequelize.STRING,
      },
      shopOwnerName: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      bankName: {
        type: Sequelize.STRING,
      },
      bankAccountNumber: {
        type: Sequelize.STRING,
      },
      juniorPriceTHB: {
        type: Sequelize.INTEGER,
      },
      seniorPriceTHB: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Shops');
  }
};
