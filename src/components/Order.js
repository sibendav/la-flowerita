import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
import "../css/orderedProduct.css";

import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ReactStars from "react-rating-stars-component";

class OrderedProduct extends Component {
  constructor(props) {
    super(props);
    console.log(props.product);
    this.state = {
      isInCart: true,
      id: props.product.id,
      name: props.product.name,
      price: props.product.price,
      quantity: props.product.quantity,
      image: props.product.image,
      subTotal: props.product.price * props.product.quantity,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.quantity !== prevState.quantity) {
      this.setState({ subTotal: this.state.quantity * this.state.price });
    }
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    var path = "";
    try {
      path =
        "data:/" +
        this.state.image.contentType +
        ";base64," +
        this.arrayBufferToBase64(this.state.image.data);
    } catch (e) {
      console.log("couldn't find path of profile image");
    }
    var currentItem = this.props.product;
    return (
      <tr key={currentItem.id}>
        <td>
          <img src={path} alt="productImg" />
        </td>
        <td>{currentItem.name}</td>
        <td className="price-new">{currentItem.price}$</td>
        {this.props.isCart ? (
          <td>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              // max={props.product.maxQuantity}
              step="1"
              defaultValue={currentItem.quantity}
              onChange={(e) => {
                this.setState({ quantity: Number(e.target.value) });
                this.props.onUpdate(e, currentItem.id);
              }}
            />
          </td>
        ) : (
          <td>
            <FaShoppingCart
              onClick={() => this.props.onAdd(currentItem.id)}
              style={{ cursor: "pointer" }}
            />
          </td>
        )}
        {this.props.isCart ? (
          <td className="subTotalShow">{this.state.subTotal}</td>
        ) : (
          ""
        )}
        <td>
          <Button
            variant="dark"
            size="sm"
            className="ms-2"
            onClick={() => this.props.onDelete(currentItem.id)}
          >
            <Icon.Trash></Icon.Trash>
          </Button>
        </td>
      </tr>
    );
  }
}

export default OrderedProduct;
