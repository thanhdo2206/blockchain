'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
     // mối quan hệ 1-N với Product
     this.hasMany(Product, {foreignKey: "agency_id"})
    }
  }
  Agency.init({
    agency_name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agency',
  });
  return Agency;
};