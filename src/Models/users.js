const mongo = require("mongoose");
const { Schema } = mongo;

const UserSchema = new Schema({
      id: Number,
      name: String,
      phone: String,
      degree: String,
      address: String,
      isActivate: Boolean,
      email: String,
      password: String
    }, { autoIndex: false });
    
    // db.model('User', UserSchema, 'User'); // (model, UserSchema, collection)
    mongo.model('Users', UserSchema,'Users'); // if model name as lowercase with suffix "s" === collection name: User => users