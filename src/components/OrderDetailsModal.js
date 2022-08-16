import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import '../css/newProductModal.css';
import withAuth from "./Auth.js";
import {FaEye, FaPen, FaTrash } from "react-icons/fa";
import swal from 'sweetalert';

class OrderDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      products: props.products,
      ERROR: "",
    };
    console.log(props);
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  changeUpdate = () => {
    this.setState({ isUpdate: !this.state.isUpdate });
  };
  
  
  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src} style={{"maxWidth": "inherit", "maxHeight": "inherit"}}/>
      );
    } else {
      return (
        <p>
          No Preview
        </p>
      );
    }
  }

  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }


  inputsHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  radioHandler = (e) => {
    this.setState({
      [e.target.name]: document.querySelector(
        `input[name=${e.target.name}]:checked`
      ).id,
    });
  };
  colorSelected = (e) => {
    this.setState({
        color : e.target.value});
  };
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    
    return (
      <div>
        <a
          role="button"
          style={{ display: this.state.showButton }}
          onClick={() => this.handleShow()}
        >
          <FaEye/>
        </a>
        <a
            role="button"
            style={{display: !this.state.isUpdate? "block" : "none"}}
            onClick={() => this.showConfirmDialog()}
        >
          <FaTrash/>
        </a>
        <Modal
        
          style={{ opacity: 1 }}
          show={this.state.showModal}
          onHide={() => this.handleClose()}
        >
          
          <Modal.Header>
            <Modal.Title>
            <Modal.Title>
            </Modal.Title>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="col-9 cartShow">
              <table class="table manage-candidates-top mb-0">
                <thead>
                  <tr>
                    <th>produt name </th>
                    <th>price </th>
                    <th>quantity</th>
                    <th>image</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((product, idx) => (
                    // path = "";
                    // if(product.image)
                    // path = "data:/" +
                    // product.image.contentType+
                    // ";base64," + this.arrayBufferToBase64(product.image.data)
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.image}</td>
                    </tr>
                  ))}
                </tbody>
              </table> 
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default OrderDetailsModal;
