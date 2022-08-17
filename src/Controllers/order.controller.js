const OrderService = require("../Services/OrderService");
const UserService = require("../Services/UserService");
const mongoose = require('mongoose');
const Orders = mongoose.model('Orders');
const crypto = require('crypto');
var fs = require('fs');
const imagesMiddleware = require("../Middleware/uploadImage");

module.exports = class Order {
  
static async getOrders(req, res, next){
    var status = req.body.status;
    var user = await UserService.FindById(req.user._id)
    console.log(status);
    console.log(user.degree);
    var orders = [];
    if(!req.user){
      return res.json({status:403, orders:[]});
    }
    if((status == "All" || !status) && user.degree=="Manager"){
        console.log("all-manager");
        orders = await  OrderService.GetALL();
    } else if(user.degree=="Manager"){
        console.log("satus-manager");
        orders = await  OrderService.GetOrderByStatus(status);
    }
    else if(status == "All"|| !status){
      console.log("all-Seller");
      orders = await  OrderService.GetALL();
      console.log(orders);
      orders =  orders.filter((x)=> {return x.products.find((p)=>{p.sellerId==req.user._id})});
    }
    else{
      console.log("status-Seller");
      orders = await  OrderService.GetOrderByStatus(status);
      console.log(orders);
      orders =  orders.filter((x)=> {return x.products.find((p)=>{p.sellerId==req.user._id})});
    }
    console.log(orders);
    return res.json({orders: orders});
}
static async getClientOrders(req, res, next){
    var id = req.user._id;
    var olduser = await UserService.FindById(id);
    if(olduser)
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
    var oldOrder = await OrderService.FindById(req.body._id);
    var status = req.body.status
    if(oldOrder){
        await OrderService.UpdateStatus(req.body._id,status)
        console.log('Order status updated:' + req.body._id);
    } else{
        return res.sendStatus(404);
    }
    return res.sendStatus(200);
  }

}
