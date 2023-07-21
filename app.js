const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`BoardShop data server listening on port ${port}`)
})