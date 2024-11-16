'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'userID', {
      type: Sequelize.STRING,
      references: {
        model: 'UserProfiles',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'userID')
  }
};
