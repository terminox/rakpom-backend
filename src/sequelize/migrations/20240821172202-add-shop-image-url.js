'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Shops', 'coverImageURL', {
          type: Sequelize.STRING,
          allowNull: true,
        }, { transaction: t }),

        queryInterface.addColumn('Shops', 'thumbnailImageURL', {
          type: Sequelize.STRING,
          allowNull: true,
        }, { transaction: t }),
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Shops', 'coverImageURL', { transaction: t }),
        queryInterface.removeColumn('Shops', 'thumbnailImageURL', { transaction: t }),
      ])
    })
  }
};
