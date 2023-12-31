'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderedProduct.belongsTo(models.Order, { foreignKey:'orderId' })
      OrderedProduct.belongsTo(models.Product, { foreignKey:'productId' })
    }
  }
  OrderedProduct.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderedProduct',
  });
  return OrderedProduct;
};