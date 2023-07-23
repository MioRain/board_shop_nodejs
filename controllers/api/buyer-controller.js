const { Order, OrderedProduct, Product } = require('../../models')

const buyerController = {
  postOrders: async (req, res) => {
    try {
      let totalPrice = 0
      const user = req.user?.toJSON()
      const { products: cartProducts } = { ...req.body }
      const productsId = cartProducts.map(item => item.id)
      const products = await Product.findAll({
        where: {
          id: productsId
        },
        raw: true
      })

      const newProducts = products.map(product => {
        const cartProduct = cartProducts.find(p => p.id === product.id)
        if (cartProduct) {
          totalPrice += product.price * cartProduct.amount
          product.inventory =  product.inventory - cartProduct.amount
          if (product.inventory < 0) throw new Error('部分商品庫存不足，請重新下單')
        }
        return product
      })

      if (totalPrice !== req.body?.totalPrice) throw new Error('部分商品價格可能有變更，請重新下單')

      const order = await Order.create({
        userId: user.id,
        price: totalPrice
      })

      const orderedProductsToCreate = productsId.map(productId => {
        return {
          orderId: order.id,
          productId
        }
      })

      const isCreated = await OrderedProduct.bulkCreate(orderedProductsToCreate)

      if (isCreated) {
        const updatePromises = newProducts.map(async (data) => {
          console.log('update')
          return await Product.update(
            { inventory: data.inventory },
            {
              where: {
                id: data.id,
              },
            }
          )
        })
        await Promise.all(updatePromises)
      }

      res.json({ order })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.message })
    }
  }
}

module.exports = buyerController