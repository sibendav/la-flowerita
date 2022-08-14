const OrderService = require("../Services/OrderService");
const mongoose = require('mongoose');
const Orders = mongoose.model('Orders');
const crypto = require('crypto');
var fs = require('fs');
const imagesMiddleware = require("../Middleware/uploadImage");

module.exports = class Order {
  
static async getOrders(req, res, next){
    var status = req.body.status;
    console.log(status);
    var orders = [];
    if(status == "All" || !status){
        console.log("all");
        orders = await  OrderService.GetALL();
    } else{
        console.log(type);
        orders = await  OrderService.GetOrderByStatus(status);
    }
    return res.json({orders: orders});
}
static async getClientOrders(req, res, next){
    var id = req.body.clientId;
    console.log(id);
    var orders = [];
    orders = await  OrderService.GetClientOrders(id);
    return res.json({orders: orders});
  }
static async addNewOrder(req, res, next){
  var order = req.body.order;
  order.status = "pending";
  const newOrder = new Orders(order);
  await newOrder.save();
  console.log('Order created:' + newOrder);
  var id = newOrder._id;
  console.log(id);
  return res.json({status: 200, id: id});
}

static async updateOrder(req, res, next){
  var oldOrder = await OrderService.FindById(req.body.order._id);
  if(oldOrder){
      var newOrder= req.body.order;
      newOrder = new Orders(newOrder);
      await OrderService.UpdateById(newOrder._id, newOrder)
      console.log('order updated:' + newOrder);
  } else{
      return res.sendStatus(404);
  }
  return res.sendStatus(200);
}
static async updateOrderStatus(req, res, next){
    var oldOrder = await OrderService.FindById(req.body.id);
    var status = eq.body.status
    if(oldOrder){
        await OrderService.UpdateStatus(req.body.id,status)
        console.log('Order status updated:' + req.body.id);
    } else{
        return res.sendStatus(404);
    }
    return res.sendStatus(200);
  }

}
