const express = require('express')
const productController = require('../../../../controllers/api/product-controller')
const router = express.Router()

router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)

module.exports = router