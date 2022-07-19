const UserService = require("../Services/UserService");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const sendEmail = require("../Middleware/sendMail")
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = class User {
  static async auth(req, res, next) {
    console.log("inside auth function");
    let exist = await UserService.FIND(req.body.email, req.body.password);
    console.log("/auth" + exist);
    if (exist != 0) {
      passport.authenticate("local", function (err, user, info) {
        if (err || !user) {
          console.log("Error", info);
          return res.status(400).send(info);
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
    return res.json(req.user);
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
    const resetToken = UserService.getResetPasswordToken();
  await user.save({ validateBeforeSave: false})

  const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password.`
  try {
    await sendEmail({
    email: user.email,
    subject: 'Password reset',
    message: message,
    html: '<strong>To set new Password: </strong>'
    + ' <a href="' + resetUrl + '">Restore Password</a>'
    })
    console.log("email sent");
    return res.status(200);
    } catch (error) {
    console.log(error);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })
    return res.sendStatus(500);
    }
  }
  
}
