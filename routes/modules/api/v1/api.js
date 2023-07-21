const express = require('express')
const userController = require('../../../../controllers/api/user-controller')
const productController = require('../../../../controllers/api/product-controller')
const categoryController = require('../../../../controllers/api/category-controller')
const router = express.Router()

router.post('/signup', userController.postSignUp)
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.get('/categories', categoryController.getCategories)

module.exports = router