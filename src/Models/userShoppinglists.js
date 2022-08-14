const mongo = require("mongoose");
const { Schema } = mongo;

const UserShoppinglistsSchema = new Schema({
      userId: String,
      shoppinglists: Array,
    }, { autoIndex: false });

    mongo.model('UserShoppinglists', UserShoppinglistsSchema, 'UserShoppinglists');
