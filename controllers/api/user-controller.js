require('dotenv').config()
const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  postSignUp: async (req, res) => {
    try {
      const { name, email, password, checkPassword, isSeller } = req.body

      if (!name || !email || !password || !checkPassword) throw new Error('請輸入所有欄位')
      if (password !== checkPassword) throw new Error('輸入的密碼不一致')
      if (name.length > 50) throw new Error('字數超出上限！')

      const userNameResponse = await User.findOne({ where: { name } })
      const userEmailResponse = await User.findOne({ where: { email } })

      if (userNameResponse) throw new Error('名稱已被使用')
      if (userEmailResponse) throw new Error('email 已被使用')

      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: isSeller ? 'seller' : 'buyer'
      })

      res.json(user)

    } catch (err) {
      console.log(err)
      res.json({ error: err.message })
    }
  },
  postSignIn: (req, res) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      console.log(err)
      res.json({ error: err.message })
    }
  }
}

module.exports = userController