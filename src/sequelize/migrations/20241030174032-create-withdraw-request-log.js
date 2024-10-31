'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('WithdrawRequestLogs', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      shopID: {
        type: Sequelize.STRING,
        references: {
          model: 'Shops',
          key: 'id'
        },
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('WithdrawRequestLogs')
  }
}
