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

class UpdateUserModal extends Component {
  constructor(props) {
    super(props);
    console.log(props.image.data);
    this.state = {
      showModal: false,
      isUpdate: false,
      id: props.id,
      name: props.name,
      phone: props.phone,
      degree: props.degree,
      address: props.address,
      isActivate: props.isActivate,
      email: props.email,
      ERROR: "",
    };
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
  
  showConfirmDialog = () => {
    this.handleClose();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteProduct()
        },
        {
          label: 'No',
        }
      ]
    });
  };
  async deleteUser(){
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: this.state.id}),
    };
    await fetch("/deleteUser", options).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("deleting user was successful");
        } else if (res.status == 404) {
          this.setState({ ERROR: "User does not exist already" });
        } else if (res.status == 400) {
          this.setState({ ERROR: "There was an error. Please try again" });
        } else if (res.status == 500) {
          this.setState({ ERROR: "There was an error on our side" });
        }
      },
      (error) => {
        this.setState({
          ERROR: error,
        });
      }
    );
    swal("Deleted!", "User deleted successfully!", "success");
  }
  async updateUser() {
    var name = this.state.name;
    var phone = this.state.phone;
    var degree = this.state.degree;
    var address = this.state.address;
    var email = this.state.email;
    if (
      name == "" ||
      phone == "" ||
      degree == "" ||
      address == "" ||
      email == ""
      ) {
      this.setState({ ERROR: "Please fill all the fields." });
      return;
    }
    var user = {
      name: name,
      phone: phone,
      degree: degree,
      address: address,
      email: email,
      _id: this.state.id
    };

    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({user: user}),
    };
    await fetch("/updateUser", options).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("updating user was successful");
        } else if (res.status == 400) {
          this.setState({ ERROR: "There was an error. Please try again" });
        } else if (res.status == 500) {
          this.setState({ ERROR: "There was an error on our side" });
        }
      },
      (error) => {
        this.setState({
          ERROR: error,
        });
      }
    );
  }
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
        <Modal
          style={{ opacity: 1 }}
          show={this.state.showModal}
          onHide={() => this.handleClose()}
        >
          
          <Modal.Header>
            <Modal.Title>
              <div className="modal-header">
              <img style={{"maxWidth": "inherit", "maxHeight": "50%","borderRadius":"50%"}} src={this.props.path} 
                onError={( e ) => {
                  e.target.src='https://www.freeiconspng.com/uploads/no-image-icon-11.PNG';
                  e.target.onerror = null; // prevents looping
                }}
                alt={this.state.name} height="150" />
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.state.name}
                </h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form key={this.state.id}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={this.inputsHandler}
                  defaultValue={this.state.name}
                  required
                  autoFocus
                  disabled = {this.state.isUpdate? "" : "disabled"}
                />
              </div>
              
              <div className="mb-3" style={{display:!this.state.isUpdate? "block" : "none"}}>
                <input type="color" value={this.state.color} disabled = "disabled"/>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="phone number"
                  defaultValue={this.state.description}
                  onChange={this.inputsHandler}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={this.inputsHandler}
                  defaultValue={this.state.price}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3" style={{display: this.state.isUpdate? "none" : "block"}}>
              <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  defaultValue={this.state.type}
                  onChange={this.inputsHandler}
                  required
                  disabled = "disabled" 
                  />
                  </div>
                  <div className="mb-3" style={{display:this.state.isUpdate? "block" : "none"}}>
                <input
                  type="radio"
                  name="degree"
                  id="Worker"
                  onChange={this.radioHandler}
                  checked = {this.state.degree == "Worker" ? "checked" : null}
                />
                <label for="rd1">Worker</label>
                <input
                  type="radio"
                  name="degree"
                  id="Client"
                  onChange={this.radioHandler}
                  checked = {this.state.degree == "Client" ? "checked" : null}
                />
                <label for="rd2">Client</label>
              </div>
              
            </form>
          </Modal.Body>
          <Modal.Footer>
            <h5>{this.state.ERROR}</h5>
            <div className="modal-footer">
            <a
              role="button"
              style={{display: this.state.isUpdate? "block" : "none"}}
              onClick={() => this.changeUpdate()}
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
            <a
              role="button"
              style={{display: !this.state.isUpdate? "block" : "none"}}
              onClick={() => this.changeUpdate()}
            >
              <FaPen/>
            </a>
            <button onClick={() => this.updateProduct()} className="button-17" style={{display: this.state.isUpdate? "block" : "none"}}>Update</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateUserModal;
