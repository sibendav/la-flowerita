const ProductService = require('../Services/ProductService');
module.exports = class Catalog {

    static async getCatalog(req, res, next){
        var products = await  ProductService.GetALL();
        console.log(products);
        return res.json({products: products});
    }
}