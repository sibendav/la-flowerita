const WishlistService = require('../Services/WishlistService');
const mongoose = require('mongoose');
const Wishlists = mongoose.model('Wishlists');
const Users = mongoose.model('Users');
const Products = mongoose.model('Products');

module.exports = class Wishlist {

    static async addNewProductToWishlist(req, res, next){
        try{
        var wishlist = { products: [] };
        var productId = req.body.productId;
        var product = await Products.findById(productId);
        if(req.user){
        await WishlistService.AddProduct(req.user._id, productId);
        wishlist = await WishlistService.GetCurrentWishlist(req.user._id);
        console.log(wishlist);
        wishlist.products = await WishlistService.GetProductsDetails(wishlist.products);
        } else {
                console.log("add product to wishlist in session")
                if(req.session.wishlist == undefined){
                    req.session.wishlist = {products:[]}
                    req.session.save((err) => {
                        console.log(err);
                      });
                }
                console.log(req.session)
                let ssn = req.session;
                console.log(ssn.wishlist)
                if(!ssn.wishlist.products.find(p => {if (p.id === product._id.toString()) {
                      return true;
                    }
                    return false;
                  }))
                {
                    console.log("the only one in the list")
                    ssn.wishlist.products.push({id:product._id, price: product.price, image: product.image, name:product.name});
                } else{
                    console.log("exists")
                }
                console.log(ssn.wishlist)
                req.session.wishlist = ssn.wishlist;
                // req.session.wishlist = ssn.wishlist;
                req.session.save((err) => {
                    console.log(err);
                  });
                return res.json({status:200,wishlist: ssn.wishlist});
        }
        console.log(wishlist);
        return res.json({status:200,wishlist: wishlist});
    } catch(e){
        console.log(e);
    }
    } 
    static async updateProductInWishlist(req, res, next){
        try{
            var wishlist = { id: 0, products: [] };
            var product = req.body.product;
            var productId = product.productId;
            console.log(productId);     
            if (req.user) {
              var id = req.user._id;
              console.log(product);
              await WishlistService.UpdateProduct(product);
              var wishlist = await WishlistService.GetCurrentWishlist(id);
              wishlist.products = await WishlistService.GetProductsDetails(wishlist.products);
            } else {
                if(req.session.wishlist){
                console.log(req.session)
                let ssn = req.session;
                ssn.wishlist.products.map(p => p.id == product.productId ? p.quantity = product.quantity : p.quantity = product.quantity);
                req.session.wishlist = ssn.wishlist;
                req.session.save((err) => {
                    console.log(err);
                  });
                  return res.json({status:200,wishlist: ssn.wishlist});
                } else{
                    return res.json({status:404,wishlist: wishlist});
                }
            }
            return res.json({status:200,wishlist: wishlist});
        } catch(e){
            console.log(e);
            return res.json({status:500});
        }
    }
    static async deleteProductFromWishlist(req, res, next){
        try{
            var wishlist = {products: [] };
            var loggedUser = req.user ? true : false;
            var productId = req.body.productId;
            if (loggedUser) {
              var id = req.user._id;
              await WishlistService.DeleteProduct(id, productId);
              var wishlist = await WishlistService.GetCurrentWishlist(id);
              wishlist.products = await WishlistService.GetProductsDetails(wishlist.products);
            } else {
                if(req.session.wishlist){
                console.log("product id: " + productId)
                var ssn = req.session;
                ssn.wishlist.products = ssn.wishlist.products.filter(p => p.id != productId);
                req.session.wishlist = ssn.wishlist;
                req.session.save((err) => {
                    console.log(err);
                  });
                  return res.json({status:200,wishlist: ssn.wishlist});
                } else{
                    return res.json({status:404,wishlist: wishlist});
                }
            }
            return res.json({status:200,wishlist: wishlist});
        } catch(e){
            console.log(e)
            return res.sendStatus(500);
        }
    }
    static async getCurrentWishlist(req, res, next){
        console.log("hi") 
        var wishlist = {products:[]};
        var loggedUser = req.user ? true : false;
        if (loggedUser) {
          var id = req.user._id;
            wishlist = await WishlistService.GetCurrentWishlist(id);
            if (wishlist) {
                wishlist.products = await WishlistService.GetProductsDetails(
                  wishlist.products
                );
              } else {
                wishlist = new Wishlists({
                  userId: id,
                  products: [],
                });
                await wishlist.save();
                var wishlist = { products: [] };
              }
            console.log("wishlist of user successful");
        } else {
            if(req.session.wishlist){
                wishlist = req.session.wishlist;
                wishlist.products = await WishlistService.GetProductsDetails(
                    wishlist.products.map(p => p.id)
                  );
                console.log("get wishlist from session")
            }
        }
        console.log(wishlist)
        return res.json({status: 200, wishlist: wishlist});
    }
    
}