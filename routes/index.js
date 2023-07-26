const express = require('express')
const router = express.Router()

const apiV1 = require('./modules/api/v1/api')

router.use('/api/v1', apiV1)
router.get('*', (req, res) => {
  res.status(403).json({ message: 'Sorry, Not Found.' })
})

module.exports = router