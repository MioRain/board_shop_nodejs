'use strict';
const bcrypt = require('bcryptjs')

function createUsersArray(userNmae, length) {
  return Array.from({ length }, (v, i) => {
    const name = userNmae + (i + 1).toString().padStart(3, '0')
    return {
      name,
      email: name + '@example.com',
      password: bcrypt.hashSync('titaner', bcrypt.genSaltSync(10), null),
      role: userNmae,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = createUsersArray('buyer', 5)
    users.push(...createUsersArray('seller', 2))
    await queryInterface.bulkInsert('Users',users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
