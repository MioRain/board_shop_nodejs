const passport = require('../config/passport')

const authenticated = async (req, res, next) => {
  try {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user) {
          reject(err)
        }
        resolve(user);
      })(req, res)
    });
    req.user = user
    next()

  } catch (error) {
    res.status(401).json({ message: '驗證失敗，請重新登入' });
  }
};

const authenticatedSeller = (req, res, next) => {
  if (req.user && req.user.role === 'seller') return next()
  return res.status(403).json({ status: 'error', message: '帳號非賣家身份' })
}

module.exports = {
  authenticated,
  authenticatedSeller
}