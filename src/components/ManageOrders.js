import {React, Component} from 'react';
import sampleImage from '../logo.svg';
import '../css/shoppingCart.css';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import Order from "./Order.js"
import swal from "sweetalert";
import { Container, Table, Row, Button } from "react-bootstrap";
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
class ManageOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      status: false,
    };
  }
  componentDidMount = async () => {
    var status = this.state.status ? this.state.status : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({status: status})
    };
    console.log(status);
    trackPromise(fetch("/getOrders", options).then(res => res.json())
    .then((result) => {
      console.log(result); 
      this.setState({ orders: result.orders });
    }));
  }

  componentDidUpdate = async(prevProps,prevState) =>  {
    if (this.state.status !== prevState.status) {
    console.log('type changed');
    var status = this.state.status ? this.state.status : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({status: status})
    };
    console.log(status);
    trackPromise(fetch("/getOrders", options).then(res => res.json())
    .then((result) => {
      console.log("hi");
      this.setState({ orders: result.orders });
      console.log(this.state.orders);
    }));
 }
}
  refreshPage() {
    window.location.reload(false);
  }

  async changeType(e){
    var status = e.target.value;
    this.setState({status:status});
  }

  

  render() {
    return (
      <div className="productSlider mb-5 mt-5">
        <Container>
          
          <h5 className="text-left mb-4 ps-2">Order List</h5>
          <div style={{"marginTop":"inherit"}} className="btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={(e) => this.changeType(e)} value="Pending" className="button-17">Pending</button>
          <button type="button" onClick={(e) => this.changeType(e)} value="InProcess" className="button-17">In process</button>
          <button type="button" onClick={(e) => this.changeType(e)} value="Completed" className="button-17">Completed</button>
          <button type="button" onClick={(e) => this.changeType(e)} value="All" className="button-17">All</button>
          <button type="button" onClick={() => this.refreshPage()} style={{"width":"10%","height":"5%",margin:"20px"}}>
            <span><img src="images/refresh.png" style={{"height":"auto",width:"20%"}}/></span>&nbsp;Refresh
          </button>
          </div>
          <Row>
            <div className="col-9 cartShow">
              <Table bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Order </th>
                    <th>Date </th>
                    <th>Sub Total</th>
                    <th>Status</th>
                    <th>Order details </th>
                  </tr>
                </thead>
                <tbody>
                <LoadingIndicator/>
                  {this.state.orders.map((order, idx) => (
                    <Order
                      key={order._id}
                      _id = {order._id}
                      userId =  {order.userId}
                      products = {order.products} 
                      totalPrice =  {order.totalPrice}
                      date = {order.date}
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