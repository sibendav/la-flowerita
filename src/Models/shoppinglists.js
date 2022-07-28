const mongo = require("mongoose");
const { Schema } = mongo;

const ShoppinglistSchema = new Schema({
      userId: Number,
      products: Array,
      totalPrice: Number,
      isPaid: Boolean,
    }, { autoIndex: false });

    mongo.model('Shoppinglists', ShoppinglistSchema, 'Shoppinglists'); // if model name as lowercase with suffix "s" === collection name: User => users
