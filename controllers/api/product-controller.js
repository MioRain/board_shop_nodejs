
const { Product, Category } = require('../../models')

const productController = {
  getProducts: async (req, res) => {
    const products = await Product.findAll({
      include: Category
    })

    res.json(products)
  },
  getProduct: async (req, res) => {
    const productId = req.params.id
    const product = await Product.findByPk(
      productId,
      {
        include: Category
      })

    res.json(product)
  }
}

module.exports = productController