const { Category } = require('../../models')

const categoriesController = {
  getCategories: async (req, res) => {
    try {
      const categoies = await Category.findAll()
      res.json(categoies)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = categoriesController