const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require("../Models/users");
var mongoose = require("mongoose");
const User = mongoose.model('Users');

module.exports = class UserService {
  static async CREATE(user) {
    return User.create({
      name: user.name,
      phone: user.phone,
      degree: user.degree,
      address: user.address,
      isActivate: true,
      email: user.email,
      password: user.password,
    });
  }

  static async GetALL() {
    return User.find({ isActivate: true }).exec();
  }
  static async GetClients() {
    return User.find({ isActivate: true, degree: "client" }).exec();
  }
  static async FindByEmail(e) {
    console.log("finding user:" + e);
    return User.find({ email: e });
  }
  static async FIND(e, p) {
    console.log("finding user:" + e + "" + p);
    return User.find({ email: e, password: p });
  }

  static async REMOVE(e, p) {
    return User.updateOne(
      { email: e, password: p },
      { $set: { isActivate: false } }
    ).exec();
  }

  static async UPDATE(e, p, newE, newP, d) {
    return User.updateOne(
      { email: e, password: p },
      { $set: { email: newE, password: newP, degree: d } }
    ).exec();
  }

  static async validatePassword(password) {
    console.log(password);
    // const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === password;
  }

  // For reseting password
  static async getResetPasswordToken() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hash token and set to resetPassordToken field
    this.resetPasswordToken = crypto
      .createHash("sha512")
      .update(resetToken)
      .digest("hex");
    return resetToken;
  }
};