'use strict'
const data = require('../helpers/2023TimeSheet.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Holidays',
      data.map((obj) => {
        return {
          date: obj.date,
          isHoliday: obj.isHoliday,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Holidays', null, {})
  }
}
