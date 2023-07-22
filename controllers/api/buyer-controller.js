const { Order, OrderedProduct, Product } = require('../../models')
const { Sequelize } = require('sequelize');


const buyerController = {
  postOrders: async (req, res) => {
    try {
      const user = req.user?.toJSON()
      const { products } = { ...req.body?.order }
      const productsId = products.map(item => item.id)
      const price = await Product.findAll({
        where: {
          id: productsId
        },
        attributes: [[Sequelize.fn('SUM', Sequelize.col('price')), 'totalPrice']],
        raw: true
      })

      const order = await Order.create({
        userId: user.id,
        price: price[0].totalPrice
      })

      const orderedProductsToCreate = productsId.map(productId => {
        return {
          orderId: order.id,
          productId
        }
      })
      
      await OrderedProduct.bulkCreate(orderedProductsToCreate)
      
      res.json({ order })
    } catch (err) {
      res.json({ error: err})
    }
  }
}

module.exports = buyerController