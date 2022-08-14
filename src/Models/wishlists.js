const mongo = require("mongoose");
const { Schema } = mongo;

const WishlistSchema = new Schema({
      userId: String,
      products: Array,
    }, { autoIndex: false });

mongo.model('Wishlists', WishlistSchema, 'Wishlists'); // if model name as lowercase with suffix "s" === collection name: User => users
