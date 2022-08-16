const UserService = require("../Services/UserService");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const sendEmail = require("../Middleware/sendMail")
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const crypto = require('crypto');
var fs = require('fs');
const imagesMiddleware = require("../Middleware/uploadImage");
const ShoppinglistsService = require('../Services/ShoppinglistService');
const WishlistService = require('../Services/WishlistService');

module.exports = class User {
  static async auth(req, res, next) {
    console.log("inside auth function");
    let exist = await UserService.FindByEmail(req.body.email);
    // console.log("/auth" + exist);
    if (exist) {
      passport.authenticate("local", function (err, user, info) {
        if (err || !user) {
          if(info && info.status == 404){
            return res.sendStatus(404);
          }
          else{
          console.log("Error", err);
          return res.sendStatus(400);
          }
        }
        var cart = req.session.cart;
        var wishlist = req.session.wishlist;
        req.logIn(user, function(err) {
          if (err) return next(err);
        
          console.log('is authenticated?: ' + req.isAuthenticated());
          console.log(req.session);
          if(cart && cart.products != []){
            ShoppinglistsService.AddProductsFromSession(req.user._id, cart.products)
           } 
           if(wishlist && wishlist.products != []){
           WishlistService.AddProductsFromSession(req.user._id, wishlist.products)
            } 
            // req.session.cart = {products:[]}
            // req.session.wishlist = {products:[]}
            // req.session.save((err) => {
            //     console.log(err);
            //   });
          return res.sendStatus(200);
          }
        );
        
          
      })(req, res, next);
    } else {
      return res.sendStatus(404);
    }
  }

  static async getCurrentUser(req, res, next) {
    console.log(req.session);
    var profileImage = "";
    if(req.user){
    var user = await UserService.FindByEmail(req.user.email);
    profileImage = user.profileImage;
    }
    console.log(req.user);
    return res.json({user: req.user, profileImage:profileImage});
  }

  static async logout(req, res, next) {
    console.log("logout");
    req.logout(function(err) {
      if (err) { return next(err); }
      return res.sendStatus(200);
        });    
  }

  static async emailForResetPassword(req, res, next) {
    console.log("emailForResetPassword");
    var email = req.body.email;
    const user = await Users.findOne({ email: email });
    if(!user){
      return res.sendStatus(404);
    }
    const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false})

  // const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password.`
  try {
    await sendEmail({
    email: user.email,
    subject: 'Password reset',
    message: message,
    html: '<strong>To set new Password: </strong>'
    + ' <h1">' + resetToken + '</h1>'
    })
    console.log("email sent " + resetToken);
    return res.sendStatus(200);
    } catch (error) {
    console.log(error);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })
    return res.sendStatus(500);
    }
  }
  
  static async checkToken(req,res,next){
  
    const resetPasswordToken = crypto
    .createHash('sha512')
    .update(req.body.token)
    .digest('hex');
  

    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
      });
  
      console.log("I am in resetPassword function");
    if(!user){
      // console.log(user);
      return res.json({status: 404});
    }
    console.log("finished checking resetPassword function");
    // console.log(user);
    return res.json({id: user._id, status: 200});
  }

  static async updatePassword(req,res,next){
    const user = await Users.findOne({ _id: req.body.id});
    if(!user){
      return res.sendStatus(404);
    }
    console.log(req.body);
    user.password = req.body.password;
    user.setPassword(user.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await UserService.UPDATE(user.email, user);
    console.log("finished resetUserPass function");
    return res.sendStatus(200);
  }

  static async signup(req, res, next){
    var user = req.body.user;

    if (user.email == "" || user.password == "" || user.phone == "" || user.degree == "" || user.address == "" || user.name == ""){
      return res.json({status:422});
    }

    let email = user.email;
    const oldUser = await Users.findOne({ email });
    if (oldUser){
      return res.json({status:409});
    }
    const newUser = new Users(user);
    newUser.setPassword(user.password);
    newUser.isActivate = true;
    newUser.isApproved = user.degree != "Customer" ? false: true;
    await newUser.save();
    console.log("user added successfullly");
    // console.log(newUser);
    return res.json({status:200, id:newUser._id});
  }



static async addUserProfile(req, res, next){
    await imagesMiddleware.uploadFile(req, res);
    var id = req.body.id;
    var user = await UserService.FindById(id);
    if(user){
        user.profileImage = {data:req.file.buffer, contentType: req.file.mimetype};
        // console.log(user);
        await UserService.UpdateById(id,user)
    }
    return res.sendStatus(200);

}


static async getProfileImage(req, res, next){
  var user = await UserService.FindByEmail(req.user.email);
  return res.json({profileImage:user.profileImage});
}



static async getUsers(req, res, next){
  var type = req.body.type;
  console.log(type);
  var users = [];
  if(type == "All" || !type){
      console.log("all");
      users = await  UserService.GetALL();
  } else{
      console.log(type);
      users = await  UserService.GetUserBydegree(type);
  }
  return res.json({users: users});
}
static async addNewUser(req, res, next){
  var user = req.body.user;
  user.isActivate = true;
  const newUser = new User(user);
  await newUser.save();
  console.log('User created:' + newUser);
  var id = newUser._id;
  console.log(id);
  return res.json({status: 200, id: id});
}

static async updateUser(req, res, next){
  var oldUser = await UserService.FindById(req.body.user._id);
  var exists = await UserService.FindByEmail(req.body.user.email)
  if(exists && exists._id != req.body.user._id){
    return res.sendStatus(400);
  }
  if(oldUser){
      var newUser = req.body.user;
      await UserService.UpdateById(req.body.user._id, newUser)
      console.log('user updated:' + newUser);
  } else{
      return res.sendStatus(404);
  }
  return res.sendStatus(200);
}
static async deleteUser(req, res, next){
  var oldUser = await UserService.FindById(req.body.id);
  if(oldUser){
      await UserService.REMOVE(req.body.id)
      console.log('User deleted:' + req.body.id);
  } else{
      return res.sendStatus(404);
  }
  return res.sendStatus(200);
}
  static async isLogged(req, res, next){
  if(req.user)
    return res.sendStatus(200);
  return res.sendStatus(404);
}

static async getSession(req, res, next){
  var profileImage = {data:"", contentType:""};
  var cart = {products: []}
  var wishlist = {products: []}
  var isLogged = false;
  console.log("getsession");
  if(req.user){
    profileImage = await Users.findById(req.user._id).profileImage;
    userName = await Users.findById(req.user._id).name;
    cart = await ShoppinglistsService.GetCurrentCart(req.user._id);
    wishlist = await WishlistService.GetCurrentWishlist(req.user._id);
    isLogged = true;
  } else{
    if(req.session.cart)
      {
        cart = req.session.cart;
      }
    if(req.session.wishlist){
      console.log("hi")
        wishlist = req.session.wishlist;
      }
  }
  var result = {isLogged: isLogged, profileImage:profileImage, cart: cart, wishlist: wishlist, userName: userName}
  console.log(req.session);
  return res.json(result)
}
}
