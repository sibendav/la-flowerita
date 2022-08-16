require("../Models/orders");
var mongoose = require("mongoose");
const Order = mongoose.model('Orders');

module.exports = class OrderService {
  static async CREATE(order) {
    return Order.create({
     id : order.id,
     userId: order.userId,
     products: order.products,
     totalPrice: order.totalPrice,
     date:order.date,
     status: order.status,
    });
  }

  static async GetALL() {
    return Order.find({ }).exec();
  }
  static async GetOrderByStatus(s) {
    return Order.find({ status: s }).exec();
  }
  static async GetClientOrders(id) {
    return Order.find({ userId: id }).exec();
  }
  
  static async FindById(id) {
    console.log("finding order:" + id);
    return Order.findOne({ _id: id });
  }

  static async UpdateStatus(id, s) {
    return Order.updateOne(
      { _id: id },
      { $set: { status: s } }
    ).exec();
  }
  
  static async UpdateById(id, order) {
    return Order.updateOne(
      { _id: id },
      { $set: { userId: order.userId, products: order.products, totalPrice: order.totalPrice, status: order.status, date : order.date} }
    ).exec();
  }


};