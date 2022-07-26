const mongo = require("mongoose");
const { Schema } = mongo;

const ProductSchema = new Schema({
      id: Number,
      name: String,
      color: String,
      price: String,
      isActivate: Boolean,
      image : {data: String, contentType: String}
    }, { autoIndex: false });

    mongo.model('Products', ProductSchema, 'Products'); // if model name as lowercase with suffix "s" === collection name: User => users
