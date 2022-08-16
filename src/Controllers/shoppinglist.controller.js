const ShoppinglistsService = require('../Services/ShoppinglistService');
const mongoose = require('mongoose');
const Shoppinglists = mongoose.model('Shoppinglists');
const Users = mongoose.model('Users');
const Products = mongoose.model('Products');
const Orders = mongoose.model('Orders');

module.exports = class Shoppinglist {
  static async addNewProductToCart(req, res, next) {
    try {
      var cart = { products: [] };
      var productId = req.body.productId;
      var product = await Products.findById(productId);
      if (req.user) {
        await ShoppinglistsService.AddProduct(req.user._id, product);
        cart = await ShoppinglistsService.GetCurrentCart(req.user._id);
        console.log(cart);
        cart.products = await ShoppinglistsService.GetProductsDetails(
          cart.products
        );
      } else {
        console.log("add product to cart in session");
        if (req.session.cart == undefined) {
          req.session.cart = { products: [] };
          req.session.save((err) => {
            console.log(err);
          });
        }
        console.log(req.session);
        let ssn = req.session;
        console.log(ssn.cart);

        if (
          !ssn.cart.products.find((p) => {
            if (p.id === product._id.toString()) {
              return true;
            }
            return false;
          })
        ) {
          console.log("the only one in the list");
          ssn.cart.products.push({
            id: product._id,
            quantity: 1,
            price: product.price,
            image: product.image,
            name: product.name,
          });
        } else {
          console.log("duplicates");
          ssn.cart.products.map((p) =>
            p.id == product._id
              ? (p.quantity = p.quantity + 1)
              : (p.quantity = p.quantity)
          );
        }
        console.log(ssn.cart);
        req.session.cart = ssn.cart;
        // req.session.cart = ssn.cart;
        req.session.save((err) => {
          console.log(err);
        });
        return res.json({ status: 200, cart: ssn.cart });
      }
      console.log(cart);
      return res.json({ status: 200, cart: cart });
    } catch (e) {
      console.log(e);
    }
  }
  static async updateProductInCart(req, res, next) {
    try {
      var cart = { id: 0, products: [] };
      var product = req.body.product;
      var productId = product.productId;
      console.log(productId);
      if (req.user) {
        var id = req.user._id;
        console.log(product);
        await ShoppinglistsService.UpdateProduct(id, product);
        var cart = await ShoppinglistsService.GetCurrentCart(id);
        cart.products = await ShoppinglistsService.GetProductsDetails(
          cart.products
        );
      } else {
        if (req.session.cart) {
          console.log(req.session);
          let ssn = req.session;
          ssn.cart.products.map((p) =>
            p.id == product.productId
              ? (p.quantity = product.quantity)
              : (p.quantity = product.quantity)
          );
          req.session.cart = ssn.cart;
          req.session.save((err) => {
            console.log(err);
          });
          return res.json({ status: 200, cart: ssn.cart });
        } else {
          return res.json({ status: 404, cart: cart });
        }
      }
      return res.json({ status: 200, cart: cart });
    } catch (e) {
      console.log(e);
      return res.json({ status: 500 });
    }
  }
  static async deleteProductFromCart(req, res, next) {
    try {
      var cart = { id: 0, products: [] };
      var productId = req.body.productId;
      if (req.user) {
        var id = req.user._id;
        //   console.log("product id " + productId);
        //   console.log("cart id " + cartId);
        await ShoppinglistsService.DeleteProduct(id, productId);
        var cart = await ShoppinglistsService.GetCurrentCart(id);
        cart.products = await ShoppinglistsService.GetProductsDetails(
          cart.products
        );
      } else {
        if (req.session.cart) {
          console.log("product id: " + productId);
          var ssn = req.session;
          ssn.cart.products = ssn.cart.products.filter(
            (p) => p.id != productId
          );
          req.session.cart = ssn.cart;
          req.session.save((err) => {
            console.log(err);
          });
          return res.json({ status: 200, cart: ssn.cart });
        } else {
          return res.json({ status: 404, cart: cart });
        }
      }
      return res.json({ status: 200, cart: cart });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  static async getCurrentCart(req, res, next) {
    // console.log("getCurrentCart");
    console.log("hi");
    var cart = { products: [] };
    if (req.user) {
      //   console.log("logged user");
      var id = req.user._id;
      if (id) {
        // console.log("searching for cart");
        cart = await ShoppinglistsService.GetCurrentCart(id);
        // console.log("found cart");
        // console.log(cart);
        if (cart && cart.products.length >= 1) {
          cart.products = await ShoppinglistsService.GetProductsDetails(
            cart.products
          );
        } else {
          //   console.log("cart not found. new cart opened");
          cart = new Shoppinglists({
            userId: id,
            products: [],
            isPaid: false,
          });
          await cart.save();
        }
        console.log("cart of user successful");
        return res.json({ status: 200, cart: cart });
      }
    } else {
      if (req.session.cart) {
        cart = req.session.cart;
        console.log("get cart from session");
        return res.json({ status: 200, cart: cart });
      }
    }
  }
  static async payNow(req, res, next) {
    if (req.user) {
      var cart = await ShoppinglistsService.GetCurrentCart(req.user._id);
      await ShoppinglistsService.CartPaid(req.user._id);
      cart.products = await ShoppinglistsService.GetProductsDetails(
        cart.products
      );
      console.log("cart" + cart);
      var totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity,0);
      console.log(totalPrice)
      var order = new Orders({userId: req.user._id, 
                            products:cart.products, 
                            totalPrice: totalPrice,
                            date: Date.now(),
                            status:"Pending"
                          })
      await order.save();
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  }
};