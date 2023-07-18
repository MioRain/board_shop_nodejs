const express = require('express')
const router = express.Router()

router.get('/products', (req, res) => {
  console.log('products')
  res.json('products')
})

module.exports = router