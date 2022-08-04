const mongo = require("mongoose");
const { Schema } = mongo;

const OrderProductSchema = new Schema({
      productId: String,
      quantity: Number,
      priceForEach: Number,
    }, { autoIndex: true });

    mongo.model('OrderProducts', OrderProductSchema, 'OrderProducts'); // if model name as lowercase with suffix "s" === collection name: User => users
