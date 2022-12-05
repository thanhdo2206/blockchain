"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Agency, User }) {
      // mối quan hệ 1-N với Categoty
      this.belongsTo(Category, { foreignKey: "category_id" });

      // mối quan hệ 1-N với Agency
      this.belongsTo(Agency, { foreignKey: "agency_id" });

      // mối quan hệ 1-N với User
      this.belongsTo(User, { foreignKey: "employee_id", as: "employee" });
    }
  }
  Product.init(
    {
      code: DataTypes.STRING,
      name_product: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
