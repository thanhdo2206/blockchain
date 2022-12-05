'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // mối quan hệ 1-N với Product
      this.hasMany(Product, {foreignKey: "category_id"})
    }
  }
  Category.init({
    category_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};