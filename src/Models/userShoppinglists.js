const mongo = require("mongoose");
const { Schema } = mongo;

const UserShoppinglistsSchema = new Schema({
      userId: Number,
      shoppinglists: Array,
    }, { autoIndex: false });

    mongo.model('UserShoppinglists', UserShoppinglistsSchema, 'UserShoppinglists');
