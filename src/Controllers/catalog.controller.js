const ProductService = require('../Services/ProductService');
const WishlistService = require('../Services/WishlistService');
const mongoose = require('mongoose');
const Products = mongoose.model('Products');
var fs = require("fs");
const imagesMiddleware = require("../Middleware/uploadImage");

module.exports = class Catalog {

    static async getCatalog(req, res, next){
        var type = req.body.type;
        console.log(type);
        var products = [];
        if(type == "All" || !type){
            // console.log("all");
            products = await  ProductService.GetALL();
        } else{
            console.log(type);
            products = await  ProductService.GetCatalogByType(type);
        }
        var loggedUser = req.user ? true : false;
        var wishlist = {products:[]};
        if (loggedUser) {
          var id = req.user._id;
          wishlist = await WishlistService.GetCurrentWishlist(id);
          console.log("get wishlist from DB")
        } else {
            if(req.session.wishlist){
                wishlist = req.session.wishlist;
                wishlist.products = wishlist.products.map(p => p.id);
                console.log("get wishlist from session")
            }
        }
        // var result = [];
        // for(var i = 0; i < products.length; i++){
        //     products[i] = {isActive:products[i].isActive, color:products[i].color, type:products[i].type, description:products[i].description,name:products[i].name, image:products[i].image,price:products[i].price, isInWishList:wishlist.products.indexOf(products[i]._id) == -1 ? false : true};
        // }

        // console.log(products[0]);

        // products = products.map(p => p.isInWishList = wishlist.products.indexOf(p.id) == -1 ? false : true);
        return res.json({products: products});
    }
    static async addNewProduct(req, res, next){
        var product = req.body.product;
        product.isActivate = true;
        const newProduct = new Products(product);
        await newProduct.save();
        console.log('Product created:' + newProduct);
        var id = newProduct._id;;
        console.log(id);
        return res.json({status: 200, id: id});
    }

    static async addProductPicture(req, res, next){
        await imagesMiddleware.uploadFile(req, res);
        var id = req.body.id;
        console.log(id);
        var product = await ProductService.FIND(id);
        if(product){
            product.image = {data: req.file.buffer, contentType:req.file.mimetype};
            console.log("good");
            await ProductService.UpdatePicture(id,product)
        }
        return res.sendStatus(200);
    }
    
    static async updateProduct(req, res, next){
        var oldProduct = await ProductService.FIND(req.body.product._id);
        if(oldProduct){
            var newProduct = req.body.product;
            newProduct = new Products(newProduct);
            await ProductService.UPDATE(newProduct._id, newProduct)
            console.log('Product updated:' + newProduct);
        } else{
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    }
    static async deleteProduct(req, res, next){
        var oldProduct = await ProductService.FIND(req.body.id);
        if(oldProduct){
            await ProductService.DELETE(req.body.id)
            console.log('Product deleted:' + req.body.id);
        } else{
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    }
}