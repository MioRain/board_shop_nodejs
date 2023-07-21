const { Op } = require("sequelize")
const { Product, Category } = require('../../models')

const productController = {
  getProducts: async (req, res) => {
    try {
      const { filter } = req.query
      const whereCondition = {}
  
      if (filter?.name) {
        whereCondition.name = {
          [Op.like]: `%${filter.name}%`
        }
      }
      if (filter?.categoryId) {
        whereCondition.categoryId = filter.categoryId
      }
      if (filter?.minSize && filter?.maxSize) {
        whereCondition.size = {
          [Op.between]: [filter.minSize, filter.maxSize]
        }
      } else if (filter?.minSize) {
        whereCondition.size = {
          [Op.gte]: filter?.minSize
        }
      } else if (filter?.maxSize) {
        whereCondition.size = {
          [Op.lte]: filter?.maxSize
        }
      }
      if (filter?.minPrice && filter?.maxPrice) {
        whereCondition.price = {
          [Op.between]: [filter.minPrice, filter.maxPrice]
        }
      } else if (filter?.minPrice) {
        whereCondition.price = {
          [Op.gte]: filter.minPrice
        }
      } else if (filter?.maxPrice) {
        whereCondition.price = {
          [Op.lte]: filter.maxPrice
        }
      }
      const products = await Product.findAll({
        where: whereCondition,
        include: Category
      })
  
      res.json(products)
    } catch (err) {
      console.log(err)
      res.json({ error: err.message })
    }
  },
  getProduct: async (req, res) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(
        productId,
        {
          include: Category
        })
  
      res.json(product)
    } catch (err) {
      console.log(err)
      res.json({ error: err.message })
    }
  }
}

module.exports = productController