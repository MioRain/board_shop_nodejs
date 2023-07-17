'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'name', {allowNull: false, type: Sequelize.STRING})
    await queryInterface.addColumn('Products', 'imagePath', { type: Sequelize.STRING})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'name')
    await queryInterface.removeColumn('Products', 'imagePath')
  }
};