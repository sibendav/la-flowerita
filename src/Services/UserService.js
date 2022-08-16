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
      image: user.image,
      isApproved: user.degree !="Customer" ? false: true
    });
  }

  static async GetALL() {
    return User.find({ isApproved:true, isActivate: true }).exec();
  }
  static async GetUserBydegree(deg) {
    return User.find({isApproved:true ,isActivate: true, degree: deg }).exec();
  }
  static async FindById(id) {
    console.log("finding user:" + id);
    return User.findOne({ _id: id }).exec();
  }
  static async FindByEmail(e) {
    console.log("finding user by email:" + e);
    return User.findOne({ email: e , isApproved: true, isActivate:true});
  }
  static async FIND(e, p) {
    console.log("finding user:" + e + "" + p);
    return await User.findOne({ email: e, password: p, isApproved: true, isActivate:true});
  }

  //static async REMOVE(e, p) {
    //return User.updateOne(
      //{ email: e, password: p },
      //{ $set: { isActivate: false } }
    //).exec();
  //}
  static async REMOVE(id) {
    return User.updateOne(
      { _id: id },
      { $set: { isActivate: false } }
    ).exec();
  }

  static async UPDATE(e, user) {
    return User.updateOne(
      { email: e },
      { $set: { email: user.email, hash: user.hash, salt:user.salt, degree: user.degree, profileImage: user.profileImage } }
    ).exec();
  }

  static async UpdateById(id, user) {
    return User.updateOne(
      { _id: id },
      { $set: { email: user.email, degree: user.degree, profileImage: user.profileImage,phone:user.phone, name:user.name} }
    ).exec();
  }

  


};