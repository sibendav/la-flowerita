const ProductService = require('../Services/ProductService');
const mongoose = require('mongoose');
const Products = mongoose.model('Products');
var fs = require("fs");
const imagesMiddleware = require("../Middleware/uploadImage");

module.exports = class Catalog {

    static async getCatalog(req, res, next){
        var products = await  ProductService.GetALL();
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
}