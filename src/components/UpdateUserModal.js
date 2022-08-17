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
    this.state = {
      showModal: false,
      isUpdate: false,
      _id: props._id,
      name: props.name,
      phone: props.phone,
      degree: props.degree,
      address: props.address,
      isActivate: props.isActivate,
      isApproved: props.isApproved,
      email: props.email,
      picture: false,
      src: false,
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
  
  showConfirmDialog = () => {
    this.handleClose();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteUser()
        },
        {
          label: 'No',
        }
      ]
    });
  };
  async deleteUser(){
    console.log(this.state);
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({_id: this.state._id}),
    };
    await fetch("/deleteUser", options).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("deleting user was successful");
          swal("Deleted!", "User deleted successfully!", "success");
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
  }
  async updateUser() {
    var name = this.state.name;
    var phone = this.state.phone;
    var degree = this.state.degree;
    var address = this.state.address;
    var email = this.state.email;
    var isApproved =  this.state.isApproved
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
      _id: this.state._id,
      isApproved: isApproved
      
    };
    console.log(user)
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
          swal("Updated!", "User updated successfully!", "success");
        } else if (res.status == 400) {
          this.setState({ ERROR: "This email already exists" });
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
    if (!this.state.picture) {
      console.log("innnnn");
      swal("Updated!", "User updated successfully!", "success");
    }else{
    var myFormData = new FormData();
    myFormData.append('file', this.state.picture);
    myFormData.append('id', this.state._id);

    const response = await fetch("/addUserPicture", {
      method: "POST",
      body: myFormData, 
    });
    if (response.status == 200) {
      swal("Updated!", "user updated successfully!", "success");
    }
  }  
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
  radioHandler1 = (e) => {
    if(e.target.id =="notApproved"){
    this.setState({
      isApproved :false
    });
  }
  if(e.target.id =="isApproved"){
    this.setState({
      isApproved :true
    });
  }
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
            <Modal.Title class = "center">
              <div className="modal-header" >
              <img  style={{"maxWidth": "inherit", "maxHeight": "50%","borderRadius":"50%"}} src={this.props.path} 
                onError={( e ) => {
                  e.target.src='https://www.freeiconspng.com/uploads/no-image-icon-11.PNG';
                  e.target.onerror = null; // prevents looping
                }}
                alt={this.state.name} height="150" />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form key={this.state._id}>
              <div className="mb-3">
              <h5>full name:</h5>
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
              <div className="mb-3">
              <h5>phone number:</h5>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="phone number"
                  defaultValue={this.state.phone}
                  onChange={this.inputsHandler}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3">
                <h5>address:</h5>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={this.inputsHandler}
                  defaultValue={this.state.address}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3" >
              <h5>email:</h5>
              <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  defaultValue={this.state.email}
                  onChange={this.inputsHandler}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                  />
                  </div>
                  <div className="mb-3" >
                <input
                  type="radio"
                  name="degree"
                  id="Seller"
                  onChange={this.radioHandler}
                  checked = {this.state.degree == "Seller" ? "checked" : null}
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
                <label for="rd1">Seller</label>
                <input
                  type="radio"
                  name="degree"
                  id="Customer"
                  onChange={this.radioHandler}
                  checked = {this.state.degree == "Customer" ? "checked" : null}
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
                <label for="rd2">Customer</label>
              </div>
              <div className="mb-3" >
                <input
                  type="radio"
                  name="isApproved"
                  id="isApproved"
                  onChange={this.radioHandler1}
                  checked = {this.state.isApproved == true ? "checked" : null}
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
                <label for="rd1">Approved</label>
                <input
                  type="radio"
                  name = "isApproved"
                  id="notApproved"
                  onChange={this.radioHandler1}
                  checked = {this.state.isApproved == false ? "checked" : null}
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
                <label for="rd2">Not Approved</label>
              </div>
              <div style={{display:this.state.isUpdate? "block" : "none"}} className="mb-3">
                <h2>Upload Product Image</h2>
                <input 
                  name="file"  
                  id="file"
                  type="file"
                  onChange={this.handlePictureSelected.bind(this)}
                />
                <br/>
                <div style={{"maxWidth": "80%", "maxHeight": "80%"}}>
                {this.renderPreview()}
                </div>
                <hr/>
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
              onClick={() => this.changeUpdate()}
            >
              <FaPen/>
            </a>
            <button onClick={() => this.updateUser()} className="button-17" style={{display: this.state.isUpdate? "block" : "none"}}>Update</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateUserModal;
