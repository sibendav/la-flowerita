import {React, Component} from 'react';
import sampleImage from '../logo.svg';
import '../css/shoppingCart.css';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import Order from "./Order.js"
import swal from "sweetalert";
import { Container, Table, Row, Button } from "react-bootstrap";

class ManageOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      orders: [],
      type: false,
    };
  }
  componentDidMount = async () => {
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    await fetch("/getOrders", options).then(res => res.json())
    .then((result) => {
      console.log(result); 
      this.setState({ orders: result.orders });
      console.log(this.state.orders);
    });
  }

  componentDidUpdate = async(prevProps,prevState) =>  {
    if (this.state.type !== prevState.type) {
    console.log('type changed');
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    await fetch("/getOrders", options).then(res => res.json())
    .then((result) => {
      console.log("hi");
      this.setState({ orders: result.orders });
      console.log(this.state.orders);
    });
 }
}
  refreshPage() {
    window.location.reload(false);
  }

  async changeType(e){
    var type = e.target.value;
    this.setState({type:type});
  }

  async deleteFromCart(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this product from cart?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({productId: id})
        };
        fetch("/deleteProductFromCart", options).then(res => res.json()).then(
          (result) => {
            console.log(result)
            if (result.status == 200) {
              this.setState({
                products: result.cart.products,
                totalPrice: result.cart.products.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                ),
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      })
    }

  async updateQuantity(e, id) {
    var quantity = Number(e.target.value);
    var product = this.state.products.filter(p => p.id == id);
    product = product[0]    
    product.quantity = quantity;
    var products = this.state.products;
    products.map((p) => {if(p.id == id) p = product})
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({product:{productId: product.id, price: product.price, quantity: product.quantity}})
    };
    await fetch("/updateProductInCart", options).then(res => res.json()).then(
      (result) => {
        console.log(result)
        if (result.status == 200) {
          this.setState({
            products: result.cart.products,
            totalPrice: result.cart.products.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <div className="productSlider mb-5 mt-5">
        <Container>
          <h5 className="text-left mb-4 ps-2">Order List</h5>
          <Row>
            <div className="col-9 cartShow">
              <Table bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Order </th>
                    <th>Products </th>
                    <th>Sub Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orders.map((order, idx) => (
                    <Order
                      
                      id = {order.id}
                      userId =  {order.userId}
                      products = {order.product} 
                      totalPrice =  {order.totalPrice}
                      status = {order.status}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ManageOrders;