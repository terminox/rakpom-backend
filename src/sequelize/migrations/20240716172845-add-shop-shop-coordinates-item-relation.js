'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('ShopCoordinatesItems', 'shopID', {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'Shops',
            key: 'id',
          },
        }, { transaction: t }),

        queryInterface.addColumn('Shops', 'coordinatesItemID', {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'ShopCoordinatesItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }, { transaction: t }),
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('ShopCoordinatesItems', 'shopID', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t }),

        queryInterface.removeColumn('Shops', 'coordinatesItemID', { transaction: t }),
      ])
    })
  }
};
