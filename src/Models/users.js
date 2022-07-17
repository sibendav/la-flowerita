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
    
    
    UserSchema.statics.CREATE = async function(user) {
        return this.create({
          name: user.name,
          phone: user.phone,
          degree: user.degree,
          address: user.address,
          isActivate: true,
          email: user.email,
          password: user.password
        });
    };

    UserSchema.statics.GetALL = async function() {
      return this.find({'isActivate': true}).exec();
    };
    UserSchema.statics.GetClients = async function() {
      return this.find({'isActivate': true,'degree':'client'}).exec();
    };
    UserSchema.statics.FIND = async function(e,p) {
      console.log("finding user:" + e + "" +p)
      return this.find({'email': e, 'password': p});     
    };

    UserSchema.statics.REMOVE = async function(e,p) {
      return this.updateOne({'email': e, 'password': p},{$set:{'isActivate': false}}).exec();
    };

    UserSchema.statics.UPDATE = async function(e,p,newE,newP,d) {
      return this.updateOne({'email': e, 'password': p},{$set:{'email': newE,'password': newP,'degree':d}}).exec();
    };
  

    // the UserSchema is useless so far
    // we need to create a model using it
    // db.model('User', UserSchema, 'User'); // (model, UserSchema, collection)
    mongo.model('Users', UserSchema,'Users'); // if model name as lowercase with suffix "s" === collection name: User => users