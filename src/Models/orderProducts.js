const mongo = require("mongoose");
const { Schema } = mongo;

const OrderProductSchema = new Schema({
      productId: Number,
      quantity: Number,
      priceForEach: Number,
    }, { autoIndex: false });

    mongo.model('OrderProducts', OrderProductSchema, 'OrderProducts'); // if model name as lowercase with suffix "s" === collection name: User => users
