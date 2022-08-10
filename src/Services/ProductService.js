require("../Models/products");
var mongoose = require("mongoose");
const Product = mongoose.model('Products');

module.exports = class ProductService {

  static async GetALL() {
    return Product.find({ isActivate: true }).exec();
  }
  static async GetCatalogByType(type) {
    return Product.find({ isActivate: true, type:type }).lean().exec();
  }

  static async CREATE(product) {
    return Product.create({
      name: product.name,
      description: product.description,
      price: product.price,
      type: product.type,
      isActivate: true,
      color: product.color,
      image: product.image,
      maxAmount: product.maxAmount,
      sellerId: product.sellerId
    });
  }

  static async LastId() {
    return Product.find().sort({ _id: -1 }).limit(1);
  }

  static async FIND(id) {
    return Product.find({ _id: id });
  }

  static async UPDATE(id, product) {
    return Product.updateOne(
      { _id: id },
      {
        $set: {
          name: product.name,
          description: product.description,
          color: product.color,
          price: product.price,
          type: product.type,
          maxAmount: product.maxAmount,
          sellerId: product.sellerId
          // image: product.image,
          // isActivate: product.isActivate
        },
      }
    ).exec();
  }

  static async UpdatePicture(id, product) {
    return Product.updateOne(
      { _id: id },
      {
        $set: {
          image: product.image,
        },
      }
    ).exec();
  }

  static async DELETE(id) {
    return Product.updateOne(
      { _id: id },
      {
        $set: {
          isActivate: false,
        },
      }
    ).exec();
  }
};