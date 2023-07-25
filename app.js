if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const routes = require('./routes')
const cors = require('cors')

const passport = require('./config/passport')

const app = express()
const port = 3000

app.use(session({ secret: 'board-shop-key', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`BoardShop data server listening on port ${port}`)
})