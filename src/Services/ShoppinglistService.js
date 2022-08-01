require("../Models/products");
var mongoose = require("mongoose");
const Product = mongoose.model('Products');

module.exports = class ProductService {

  static async GetALL() {
  }

  static async CREATE(product) {
  }

  static async FIND(id) {
    return Product.find({ _id: id });
  }

  static async UPDATE(id, product) {
  }


  static async DELETE(id) {

  }
};