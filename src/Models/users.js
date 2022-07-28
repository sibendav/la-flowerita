const mongo = require("mongoose");
const { Schema } = mongo;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
      id: Number,
      name: String,
      phone: String,
      degree: String,
      address: String,
      isActivate: Boolean,
      email: String,
      hash: String,
      salt: String,
      profileImage: {data: Buffer, contentType: String},
      resetPasswordToken: String,
    }, { autoIndex: true });
    
    UserSchema.methods.getResetPasswordToken = function(){
      // const resetToken = crypto.randomBytes(20).toString('hex');
      const resetToken = Math.floor(Math.random() * 10000).toString();
      console.log(resetToken);
      // Hash token and set to resetPassordToken field
      this.resetPasswordToken = crypto.createHash('sha512').update(resetToken).digest('hex'); 
      return resetToken;
    }
    // Generates hash and salt for user's password
    UserSchema.methods.setPassword = function(password) {
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };
    
    // Validate user's password
    UserSchema.methods.validatePassword = function(password) {
      console.log(password);
      const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
      return this.hash === hash;
    };
    
    // Generates token
    UserSchema.methods.generateJWT = function() {
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 60);
    
      return jwt.sign({
        email: this.email,
        id: this._id,
        algorithms:['sha1', 'RS256', 'HS256'],
        digest:'hex',
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      }, 'secret');
    }
    // db.model('User', UserSchema, 'User'); // (model, UserSchema, collection)
    mongo.model('Users', UserSchema,'Users'); // if model name as lowercase with suffix "s" === collection name: User => users