'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Staffs', 'loginAttempts', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('Staffs', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Staffs', 'loginAttempts')
    await queryInterface.removeColumn('Staffs', 'isAdmin')
  }
}
