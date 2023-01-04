const dayjs = require('dayjs')
/* db */
const db = require('../models')
const { Staff, Punch } = db

const punchController = {
  punch: async (req, res) => {
    try {
      const staffId = req.staff.id
      const currentHour = dayjs().format('HH:mm:ss')
      const currentDate = dayjs().format('YYYY-MM-DD')
      await Punch.create({
        staffId,
        punchInTime: currentHour,
        date: currentDate
      })
      return res.json({
        status: 'success',
        message: 'Punch in successfully'
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = punchController
