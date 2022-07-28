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

class DetailsProductModal extends Component {
  constructor(props) {
    super(props);
    console.log(props.image.data);
    this.state = {
      showModal: false,
      isUpdate: false,
      name: props.name,
      price: props.price,
      description: props.description,
      color: props.color,
      type: props.type,
      id: props.id,
      image:props.image,
      picture: false,
      src: false,
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
  async deleteProduct(){
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: this.state.id}),
    };
    await fetch("/deleteProduct", options).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("deleting product was successful");
        } else if (res.status == 404) {
          this.setState({ ERROR: "Product does not exist already" });
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
    swal("Deleted!", "Product deleted successfully!", "success");
  }
  async updateProduct() {
    var name = this.state.name;
    var price = this.state.price;
    var description = this.state.description;
    var color = this.state.color;
    var type = this.state.type;
    if (
      name == "" ||
      price == "" ||
      description == "" ||
      color == "" ||
      type == ""
      ) {
      this.setState({ ERROR: "Please fill all the fields." });
      return;
    }
    var product = {
      name: name,
      color: color,
      description: description,
      price: price,
      type: type,
      _id: this.state.id
    };

    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({product: product}),
    };
    await fetch("/updateProduct", options).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("updating product was successful");
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
    if (!this.state.picture) {
      swal("Updated!", "Product updated successfully!", "success");
      window.location.replace("#/catalog");
    }else{
    var myFormData = new FormData();
    myFormData.append('file', this.state.picture);
    myFormData.append('id', this.state.id);

    const response = await fetch("/addProductPicture", {
      method: "POST",
      body: myFormData,
    });
    if (response.status == 200) {
      swal("Updated!", "Product updated successfully!", "success");
      window.location.replace("#/catalog");
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
                  placeholder="Name of the flower"
                  onChange={this.inputsHandler}
                  defaultValue={this.state.name}
                  required
                  autoFocus
                  disabled = {this.state.isUpdate? "" : "disabled"}
                />
              </div>
              <div className="mb-3" style={{display:this.state.isUpdate? "block" : "none"}}>
                Pick a color
                <input defaultValue={this.state.color} onChange={this.colorSelected} type="color" disabled = {this.state.isUpdate? "" : "disabled"}/>
              </div>
              <div className="mb-3" style={{display:!this.state.isUpdate? "block" : "none"}}>
                <input type="color" value={this.state.color} disabled = "disabled"/>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Description"
                  defaultValue={this.state.description}
                  onChange={this.inputsHandler}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  id="price"
                  className="form-control"
                  placeholder="Price"
                  onChange={this.inputsHandler}
                  defaultValue={this.state.price}
                  required
                  disabled = {this.state.isUpdate? "" :"disabled"}
                />
              </div>
              <div className="mb-3" style={{display: this.state.isUpdate? "none" : "block"}}>
              <input
                  type="text"
                  name="type"
                  id="type"
                  className="form-control"
                  placeholder="Type"
                  defaultValue={this.state.type}
                  onChange={this.inputsHandler}
                  required
                  disabled = "disabled" 
                  />
                  </div>
                  <div className="mb-3" style={{display:this.state.isUpdate? "block" : "none"}}>
                <input
                  type="radio"
                  name="type"
                  id="Bouquet"
                  onChange={this.radioHandler}
                  checked = {this.state.type == "Bouquet" ? "checked" : null}
                />
                <label for="rd1">Bouquet</label>
                <input
                  type="radio"
                  name="type"
                  id="Flower"
                  onChange={this.radioHandler}
                  checked = {this.state.type == "Flower" ? "checked" : null}
                />
                <label for="rd2">Flower</label>
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

export default DetailsProductModal;
