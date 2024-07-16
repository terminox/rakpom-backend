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
        allowNull: false,
      },
      shopOwnerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bankAccountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      juniorPriceTHB: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seniorPriceTHB: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Shops');
  }
};
