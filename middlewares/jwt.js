const passport = require("passport")
  , ExtractJwt = require("passport-jwt").ExtractJwt
  , JwtStrategy = require("passport-jwt").Strategy
  , User = require('../models/user')

const SECRET = process.env.JWT_SECRET || 'MY_SECRET_KEY'
const jwtOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}
const jwtStrategy = new JwtStrategy(jwtOption, async (payload, done) => {
    User.findById(payload.id).select('-password')
        .then(user => {
        if (user)
            return done(null, user)
        else
            return done(null, false)
        })
        .catch(err => {
        return done(err, false)
        })
    })
passport.use(jwtStrategy)

exports.requireJWTAuth = passport.authenticate('jwt', { session: false })