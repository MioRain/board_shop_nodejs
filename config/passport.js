require('dotenv').config()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
},
  async (name, password, done) => {
      const user = await User.findOne({ where: { name } })
      if (!user) return done(null, false, { message: '無此帳號' })
      const authPassword = await bcrypt.compare(password, user.password)
      if (!authPassword) return done(null, false, { message: '帳號或密碼不符' })
      return done(null, user)
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    const user = User.findByPk(jwtPayload.id)
    cb(null, user)
  } catch(err) {
    cb(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findByPk(id)
    user = user.toJSON()
    console.log(user)
    return done(null, user)
  } catch (err) {
    console.error(err)
  }
})

module.exports = passport