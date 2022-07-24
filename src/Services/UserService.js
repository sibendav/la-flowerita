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

  static async UPDATE(e, user) {
    return User.updateOne(
      { email: e },
      { $set: { email: user.email, hash: user.hash, salt:user.salt, degree: user.degree } }
    ).exec();
  }


};