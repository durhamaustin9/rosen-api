const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const JwtStrategy = passportJwt.Strategy
const models = require('../models').models
const User = models.user

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, (jwtPayLoad, done) => {
    return User.findOne({
      where: {
        id: jwtPayLoad.id
      }
    }).then((user) => {
      return done(null, user)
    }).catch((error) => {
      return done(error)
    })
  })
)

module.exports = passport
