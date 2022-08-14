require("../Models/wishlists");
var ShoppinglistService = require("../Services/ShoppinglistService");
var mongoose = require("mongoose");
const Shoppinglist = mongoose.model('Shoppinglists');
const Wishlist = mongoose.model('Wishlists');
const Products = mongoose.model('Products');
const OrderProducts = mongoose.model('OrderProducts');
module.exports = class ProductService {

  static async GetCurrentWishlist(userId) {
    var wl = await Wishlist.findOne({userId: userId});
    if(!wl){
      console.log("new wl")
      wl = new Wishlist({userId:userId, products:[]})
      await wl.save();
    }
    return wl;
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

  static async GetProductDetails(productId) {
    var product = await Products.findById(productId)
    console.log("got product")
    var result = {id: product._id, name:product.name, price: product.price, image: product.image}
    return result;
  }

  static async AddProduct(userId, productId) {
    var wl = await this.GetCurrentWishlist(userId)
    console.log("add product to wish list")
    // create orderProduct
    var products = new Set(wl.products)
    products.add(productId);
    wl.products = Array.from(products);
    await Wishlist.updateOne(
      { _id: wl._id},
      { $set: { products: wl.products } }
    );
  }

  // static async AddProductToCart(userId, productId) {
  //   var wl = await this.GetCurrentWishlist(userId)
  //   for (let i = 0; i < wl.products.length; i++) {
  //       var product = await Products.findById(wl.products[i])
  //       await ShoppinglistService.AddProduct(userId, product)
  //   }
  // }

//   static async UpdateProduct(product) {
//     product = {productId: product.productId, quantity: product.quantity, priceForEach: product.price};
//     console.log("updating order product")
//     console.log(product.productId)
//     // cart.products.map(p => {if(p.productId == product.productId) p = product })
//     await OrderProducts.updateOne(
//       { productId: product.productId},
//       { $set: { quantity: product.quantity, price: product.price } }
//     );
//   }



  static async DeleteProduct(userId, productId) {
    var wl = await this.GetCurrentWishlist(userId);
    console.log(wl);
    const index = wl.products.indexOf(productId);
    console.log(index);
    wl.products.splice(index, 1);
    console.log("after delete" + wl.products)
    await Wishlist.updateOne(
      { _id: wl._id},
      { $set: { products: wl.products } }
    );
  }

  static async AddProductFromSession(id, productId) {
    var wishlist = await this.GetCurrentWishlist(id)
    var exists = wishlist.products.indexOf(productId) == -1 ? false: true;
    console.log("exisits " + exists);
    if(exists){
      console.log("update quantity")
      return;
    }
    console.log("new wish product " + productId);
    wishlist.products.push(productId);
    await Wishlist.updateOne(
      { _id: wishlist._id},
      { $set: { products: wishlist.products } }
    );
  }

};