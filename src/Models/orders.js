const mongo = require("mongoose");
const { Schema } = mongo;

const OrderSchema = new Schema({
      id : Number,
      userId: Number,
      products: Array,
      totalPrice: Number,
      status: String,
    }, { autoIndex: false });

    mongo.model('Orders', OrderSchema, 'Orders'); // if model name as lowercase with suffix "s" === collection name: User => users
