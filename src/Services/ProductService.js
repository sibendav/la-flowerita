require("../Models/products");
var mongoose = require("mongoose");
const Product = mongoose.model('Products');

module.exports = class ProductService {
static async CREATE(product) {
    return this.create({
      name: product.name,
      color: product.color,
      price: product.price,
      isActivate:true,
      image: product.image,
      
    });
};

static async GetALL() {
  return Product.find({'isActivate': true}).exec();
};

}