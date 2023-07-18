
const { Product, Category } = require('../../models')

const productController = {
  getProducts: async (req, res) => {
    const products = await Product.findAll({
      raw: true,
      nest: true,
      include: Category
    })
  
    res.json(products)
  }
}

module.exports = productController