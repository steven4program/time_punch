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

      // modify date to set the Day-changing time at 5:00 GMT
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
          return res.json({
            formatCurrentTime,
            status: 'success',
            message: 'Punch out, working hours less than 8'
          })
        }

        // if working hours more than 8
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
        return res.json({
          formatCurrentTime,
          status: 'success',
          message: 'Punch out successfully'
        })
      }

      // if no punch record today, then punch in
      await Punch.create({
        staffId,
        punchInTime: hour,
        date: date
      })
      return res.json({
        formatCurrentTime,
        status: 'success',
        message: 'Punch in successfully'
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = punchController
