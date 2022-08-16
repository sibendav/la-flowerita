const mongo = require("mongoose");
const { Schema } = mongo;

const OrderSchema = new Schema({
      userId: Number,
      products: Array,
      totalPrice: Number,
      date: Date,
      status: String,
    }, { autoIndex: false });

    mongo.model('Orders', OrderSchema, 'Orders'); // if model name as lowercase with suffix "s" === collection name: User => users
