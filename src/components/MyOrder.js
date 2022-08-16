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
        _id : props._id,
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
      
    return (
        
      <tr key={this.props._id}>
        <td>{this.props._id}
        </td>
        <td>{this.props.date}</td>
        {/* <td>{this.props.products}</td> */}
        <td className="price-new">{this.props.totalPrice}$</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

export default Order;
