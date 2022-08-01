const mongo = require("mongoose");
const { Schema } = mongo;

const ProductSchema = new Schema({
      id: Number,
      sellerId: Number,
      name: String,
      color: String,
      price: String,
      type: String,
      isActivate: Boolean,
      description: String,
      image : {data: Buffer, contentType: String}
    }, { autoIndex: true });

    mongo.model('Products', ProductSchema, 'Products'); // if model name as lowercase with suffix "s" === collection name: User => users
