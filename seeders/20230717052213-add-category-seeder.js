'use strict';

const seedData = ['skateboard', 'longboard', 'surf-skateboard']

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = seedData.map(name => {
      return {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
   await queryInterface.bulkInsert('Categories', categories, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
