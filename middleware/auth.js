const passport = require('../config/passport')
const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, staff, info) => {
    if (err) {
      return next(err)
    }
    if (!staff) {
      return res.status(401).json({ status: 'error', message: 'without jwt' })
    }
    req.staff = staff
    return next()
  })(req, res, next)
}

module.exports = authenticated
