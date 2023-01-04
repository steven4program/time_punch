const dayjs = require('dayjs')
const { where } = require('sequelize')
/* db */
const db = require('../models')
const { Staff, Punch } = db

const punchController = {
  punch: async (req, res) => {
    try {
      // get current user id
      const staffId = req.staff.id
      // get current time
      const currentTime = dayjs()
      // format current time to send to the front-end
      const formatCurrentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss')
      const hour = currentTime.format('HH:mm:ss')
      const date = currentTime.add(-5, 'h').format('YYYY-MM-DD')
      // check if already punch today
      const punchInCheck = await Punch.findOne({
        where: { date, staffId }
      })

      // if already punch today, then punch out
      if (punchInCheck) {
        const inTime = dayjs(punchInCheck.createdAT)
        const outTime = dayjs(currentTime)

        // calculate working hours
        const workingHours = outTime.diff(inTime, 'h')
        // if working hours less than 8
        if (workingHours < 8) {
          await Punch.update(
            {
              punchOutTime: hour,
              hours: workingHours,
              // attendance is not considered
              attendance: false
            },
            {
              where: {
                staffId,
                date
              }
            }
          )
          // if working hours more than 8
        } else {
          await Punch.update(
            {
              punchOutTime: hour,
              hours: workingHours,
              // attendance is considered valid
              attendance: true
            },
            {
              where: {
                staffId,
                date
              }
            }
          )
        }
        // if not yet punch today, then punch in
      } else {
        await Punch.create({
          staffId,
          punchInTime: hour,
          date: date
        })
      }
      // return package to front-end
      return res.json({
        formatCurrentTime,
        status: 'success',
        message: 'Punch successfully'
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = punchController
