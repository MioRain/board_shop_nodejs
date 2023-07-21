const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })
const authenticatedSeller = (req, res, next) => {
  if (req.user && req.user.role === 'seller') return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}
module.exports = {
  authenticated,
  authenticatedSeller
}