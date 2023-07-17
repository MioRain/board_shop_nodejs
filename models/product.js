'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' })
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Product.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    inventory: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};