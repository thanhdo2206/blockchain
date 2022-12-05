'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
       // mối quan hệ 1-N với Product
     this.hasMany(Product, {foreignKey: "employee_id",as:"employee"})
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};