const ProductService = require('../Services/ShoppinglistService');
const mongoose = require('mongoose');
const Products = mongoose.model('Shoppinglists');

module.exports = class Shoppinglist {

    static async addProduct(req, res, next){
        
    } 
    static async updateProduct(req, res, next){
    }
    static async deleteProduct(req, res, next){
    }
    static async getShoppinglistOfUser(req, res, next){
    } 
}