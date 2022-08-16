import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
import "../css/orderedProduct.css";
import swal from "sweetalert";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ReactStars from "react-rating-stars-component";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id : props.id,
        userId :  props.userId,
        products : props.products,
        totalPrice :  props.totalPrice,
        date: props.date,
        status : props.status,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.status !== prevState.status) {
        console.log(this.state.status);
        var options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
         fetch("/updateOrderStatus", options).then((res) => {
            if(res.status == 200){
                swal("Updated","order is successfuly update","success");
          }
            else{
              swal("Error","There was an error","error");
            }
        });
    }
  }

  
  render() {
      
    var currentItem = this.props.order;
    return (
        
      <tr key={currentItem.id}>
        <td>{this.props.id}
        </td>
        <td>{this.props.date}</td>
        <td>{this.props.products}</td>
        <td className="price-new">{this.props.totalPrice}$</td>
        
          <td>
            <select
              name="status"
              id="status"
              defaultValue={this.props.status}
              onChange={(e) => {
                this.setState({ status: String(e.target.value) });
                this.props.onUpdate(e, currentItem.id);
              }}>
              <option value ="Pending" >Pending</option>
              <option value ="InProcess" >In process</option>
              <option value ="Completed" >Completed</option>
              
            </select>
          </td>
      </tr>
    );
  }
}

export default Order;
