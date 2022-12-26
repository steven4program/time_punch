'use strict'
const bcrypt = require('bcryptjs')
const SEED_STAFF = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Staffs', [
      {
        name: SEED_STAFF.name,
        email: SEED_STAFF.email,
        password: bcrypt.hashSync(
          SEED_STAFF.password,
          bcrypt.genSaltSync(10),
          null
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Staffs', null, {})
  }
}
