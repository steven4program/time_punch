'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Punches', 'StaffId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Staffs',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropColumn('Punches', 'StaffId')
  }
}
