const express = require('express')
const productController = require('../../../../controllers/api/product-controller')
const router = express.Router()

router.get('/products', productController.getProducts)

module.exports = router