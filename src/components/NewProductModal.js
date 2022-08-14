import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import '../css/newProductModal.css';
import withAuth from "./Auth.js"
import swal from 'sweetalert';

class NewProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal,
      name: "",
      price: 0,
      description: "",
      color: "#000000",
      type: "",
      picture: false,
      src: false,
      id: 0,
      maxAmount:"",
      ERROR: "",
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };

  async addProduct() {
    var name = this.state.name;
    var price = this.state.price;
    var description = this.state.description;
    var color = this.state.color;
    var type = this.state.type;
    var picture = this.state.picture;
    var maxAmount = this.state.maxAmount;
    if (
      name == "" ||
      price == "" ||
      description == "" ||
      color == "" ||
      type == "" ||
      maxAmount == "" ||
      !picture
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
      maxAmount: maxAmount
    };

    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({product: product}),
    };
    var id = 0;
    await fetch("/addNewProduct", options).then(res => res.json()).then(
      (res) => {
        console.log(res);
        if(res.status == 403){
          swal("No permission","You don't have permission for this option","error");
          return;
        }
        if (res.status == 200) {
          id = res.id;
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

    if(id != 0){
    var myFormData = new FormData();
    myFormData.append('file', this.state.picture);
    myFormData.append('id', id);

    const response = await fetch("/addProductPicture", {
      method: "POST",
      body: myFormData,
    });
    if (response.status == 200) {
      swal("Success!", "Product added successfully!", "success");
    }
  }else{
    swal("Error!", "There was an error in uploading image", "error");  }
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
        <br/>
        <Modal
          style={{ opacity: 1 }}
          show={this.state.showModal}
          onHide={() => this.handleClose()}
        >
          <Modal.Header>
            <Modal.Title>
              <div className="modal-header">
                {/* <img src="images\login.png" width="72" height="72" /> */}
                <h5 className="modal-title" id="exampleModalLabel">
                  Add new Flower
                </h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Name of the flower"
                  onChange={this.inputsHandler}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                Pick a color
                <input onChange={this.colorSelected} type="color" />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={this.inputsHandler}
                  required
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
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="maxAmount"
                  id="maxAmount"
                  className="form-control"
                  placeholder="Max Amount"
                  onChange={this.inputsHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="radio"
                  name="type"
                  id="Bouquest"
                  onChange={this.radioHandler}
                />
                <label for="rd1">Bouquest</label>
                <input
                  type="radio"
                  name="type"
                  id="Flower"
                  onChange={this.radioHandler}
                />
                <label for="rd2">Flower</label>
              </div>
              <div className="mb-3">
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
              <button
                className="button-17"
                role="button"
                onClick={() => this.addProduct()}
                type="submit"
              >
                Add
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// export default withAuth(NewProductModal);
export default NewProductModal;
