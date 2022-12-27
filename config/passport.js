//必要套件
const passport = require('passport')

// DB
const db = require('../models')
const { Staff } = db

// JWT
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    Staff.findByPk(jwtPayload.id)
      .then((staff) => cb(null, staff))
      .catch((err) => cb(err))
  })
)

module.exports = passport
