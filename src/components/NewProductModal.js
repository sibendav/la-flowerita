import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";

class NewProductModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
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
    alert("hii");
  }


  inputsHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Button
          style={{ display: this.props.showButton }}
          className="nav-item ml-auto btn btn-outline-success"
          onClick={() => this.handleShow()}
        >
          Login
        </Button>
        <Modal
          style={{ opacity: 1 }}
          show={this.state.showModal}
          onHide={() => this.handleClose()}
        >
          <Modal.Header>
            <Modal.Title>
              <div className="modal-header">
                <img src="images\login.png" width="72" height="72" />
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
                <input
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                  placeholder="Color"
                  onChange={this.inputsHandler}
                  required
                />
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
                  name="price"
                  id="price"
                  className="form-control"
                  placeholder="Price"
                  onChange={this.inputsHandler}
                  required
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <h5>{this.state.ERROR}</h5>
            <div className="modal-footer">
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={() => this.dofetch()}
                type="submit"
              >
                Sign in
              </button>
              <NavLink
                style={{cursor:"pointer"}}
                onClick={() => this.handleClose()}
                to="/resetPassword"
              >
                forgot pasword ? click here
              </NavLink>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewProductModal;
