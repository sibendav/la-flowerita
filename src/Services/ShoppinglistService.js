require("../Models/shoppinglists");
var mongoose = require("mongoose");
const Shoppinglist = mongoose.model('Shoppinglists');
const Products = mongoose.model('Products');
const OrderProducts = mongoose.model('OrderProducts');
module.exports = class ProductService {

  static async GetCurrentCart(userId) {
    return Shoppinglist.findOne({userId: userId, isPaid: false});
  }

  static async GetProductsDetails(products) {
    var result = [];
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      result.push(await this.GetProductDetails(products[i]));
    }
    return result;
  }

  static async GetProductDetails(orderProductId) {
    console.log("inside order product")
    console.log(orderProductId);
    var orderProduct = await OrderProducts.findById(orderProductId)
    console.log("got order product")
    var product = await Products.findById(orderProduct.productId)
    console.log("got product")
    var result = {id: product._id, name:product.name, price: product.price, quantity: orderProduct.quantity, image: product.image}
    return result;
  }

  static async GetALL() {
  }

  static async CREATE(product) {
  }

  static async FIND(id) {
    return Products.findById(id);
  }

  static async AddProduct(id, product) {
    var cart = await this.GetCurrentCart(id)
    var orderProducts = await OrderProducts.find({ _id: { "$in": cart.products }});
    var orderProduct = orderProducts.find(p => p.productId == product._id);
    console.log("exisits " + orderProduct);
    if(orderProduct){
      console.log("update quantity")
      await OrderProducts.updateOne(
        { productId:product._id },
        { $set: { quantity:  orderProduct.quantity + 1 } }
      );
      return;
    }
    console.log("create orderProduct")
    // create orderProduct
    product = {productId: product._id, quantity: 1, priceForEach: product.price};
    var orderProduct = new OrderProducts(product);
    await orderProduct.save();
    console.log(orderProduct)
    console.log("new order product " + orderProduct);
    cart.products.push(orderProduct._id);
    await Shoppinglist.updateOne(
      { _id: cart._id},
      { $set: { products: cart.products } }
    );
  }

  static async UpdateProduct(product) {
    product = {productId: product.productId, quantity: product.quantity, priceForEach: product.price};
    console.log("updating order product")
    console.log(product.productId)
    // cart.products.map(p => {if(p.productId == product.productId) p = product })
    await OrderProducts.updateOne(
      { productId: product.productId},
      { $set: { quantity: product.quantity, price: product.price } }
    );
  }



  static async DeleteProduct(id, productId) {
    var cart = await this.GetCurrentCart(id);
    var orderProduct = await OrderProducts.findOne({ productId: productId });
    const index = cart.products.indexOf(mongoose.Types.ObjectId(orderProduct._id));
    console.log(index);
    cart.products.splice(index, 1);
    console.log("after delete" + cart.products)
    await Shoppinglist.updateOne(
      { _id: cart._id},
      { $set: { products: cart.products } }
    );
    await OrderProducts.deleteOne({productId: productId})
  }
};