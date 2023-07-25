'use strict';
const { User, Category } = require('../models')
const { faker } = require('@faker-js/faker')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAndCountAll()
    const categories = await Category.findAndCountAll()
    const products = Array.from({ length: 50 }, (v, i) => {
      const userRandomIndex = getRandomNumber(0, users.count - 1)
      const categoryRandomIndex = getRandomNumber(0, categories.count - 1)
      return {
        userId: users.rows[userRandomIndex].id,
        description: faker.commerce.productDescription(),
        categoryId: categories.rows[categoryRandomIndex].id,
        size: getRandomNumber(40, 50),
        price: getRandomNumber(3000, 10000),
        inventory: getRandomNumber(1,100),
        isPublic: Math.random() < 0.5,
        name: faker.commerce.productName(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
   await queryInterface.bulkInsert('Products', products)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
