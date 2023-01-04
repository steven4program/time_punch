'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Punches', 'date', {
      type: Sequelize.DATEONLY
    })
    await queryInterface.addColumn('Punches', 'hours', {
      type: Sequelize.INTEGER
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Punches', 'date')
    await queryInterface.removeColumn('Punches', 'hours')
  }
}
