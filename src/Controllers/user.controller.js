const UserService = require("../Services/UserService");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const sendEmail = require("../Middleware/sendMail")
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const crypto = require('crypto');
var fs = require('fs');
const imagesMiddleware = require("../Middleware/uploadImage");

module.exports = class User {
  static async auth(req, res, next) {
    console.log("inside auth function");
    let exist = await UserService.FindByEmail(req.body.email);
    // console.log("/auth" + exist);
    if (exist) {
      passport.authenticate("local", function (err, user, info) {
        if (err || !user) {
          if(info.status == 404){
            return res.sendStatus(404);
          }
          else{
          console.log("Error", err);
          return res.sendStatus(400);
          }
        }

        req.logIn(user, function (err) {
          if (err) {
            return next(err);
            // return res.status(404).send("Username or password incorrect");
          }
        });
        return res.sendStatus(200);
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
    // console.log(req.user);
    return res.json({user: req.user, profileImage:profileImage});
  }

  static async logout(req, res, next) {
    console.log("logout");
    req.logout();
    return res.sendStatus(200);
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
      console.log(user);
      return res.json({status: 404});
    }
    console.log("finished checking resetPassword function");
    console.log(user);
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
    await newUser.save();
    console.log("user added successfullly");
    console.log(newUser);
    return res.json({status:200, id:newUser._id});
  }



static async addUserProfile(req, res, next){
    await imagesMiddleware.uploadFile(req, res);
    var id = req.body.id;
    var user = await UserService.FindById(id);
    if(user){
        user.profileImage = {data:req.file.buffer, contentType: req.file.mimetype};
        console.log(user);
        await UserService.UpdateById(id,user)
    }
    return res.sendStatus(200);

}


static async getProfileImage(req, res, next){
  var user = await UserService.FindByEmail(req.user.email);
  return res.json({profileImage:user.profileImage});
}

}
