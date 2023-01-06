'use strict'
const bcrypt = require('bcryptjs')
const SEED_STAFF = [
  {
    name: 'tiadmin',
    email: 'tiadmin@example.com',
    password: 'tiadmin',
    loginAttempts: 0,
    isAdmin: true
  },
  {
    name: 'titaner',
    email: 'titaner@example.com',
    password: 'titaner',
    loginAttempts: 0,
    isAdmin: false
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      'Staffs',
      SEED_STAFF.map((staff) => {
        return {
          name: staff.name,
          email: staff.email,
          password: bcrypt.hashSync(
            staff.password,
            bcrypt.genSaltSync(10),
            null
          ),
          loginAttempts: staff.loginAttempts,
          isAdmin: staff.isAdmin,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Staffs', null, {})
  }
}
