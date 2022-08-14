import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import {FiLogIn,} from "react-icons/fi";
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: "",
      password: "",
      ERROR: "",
      reloadNavbar: props.reloadNavbar,
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  async dofetch() {
    // check inputs
    // alert("Im in dofetch");
    var email = this.state.email;
    var password = this.state.password;
    if (email === "" || password === "") {
      this.setState({ ERROR: "Please fill all the fields" });
      return;
    }
    if (!email.includes("@")) {
      this.setState({ ERROR: "Please fill all the fields correctly" });
      return;
    }

    // pass inputs to server
    let user = { email, password };
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    // alert("Im before the fetch");
    await fetch("/auth", options)
    .then(
      (res) => {
        // alert(res.status);
        if (res.status === 200) {
          swal("Success!", "You Logged In!", "success");
          document.location.href = "/";
        }
        else if(res.status === 404){
          this.setState({ ERROR: "Email or password is not correct." });
          return;
        }
        else if(res.status === 400){
          this.setState({ ERROR: "There was an error. Please try again" });
          return;
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          ERROR: error
        });
        return;
      }
    )
    // options = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" }
    //   };
    // await fetch("/getCurrentUser", options).then(res => res.json()).then((res) => {
    //   sessionStorage.setItem("profileImage", JSON.stringify(res.profileImage));
    //   sessionStorage.setItem("email", JSON.stringify(res.user.email));
    //   // alert(res.profileImage);
    //   this.state.reloadNavbar();
    //   // document.location.href = "/";
    // })
    }


  inputsHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Button
          title="Log In"
          class="btn btn-primary btn-lg btn-floating" 
          style={{display: this.props.showButton,"background-color": "#17c0eb"}}
          onClick={() => this.handleShow()}
        >
          {this.props.menuCollapse ? "" :"Login"}<FiLogIn/>
        </Button>
        {/* <button style={{"float":"right"}} type="button" id="login"  data-bs-toggle="modal" data-bs-target="#myModal">
                      Login */}

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
                  Please sign in
                </h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email address"
                  onChange={this.inputsHandler}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
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

export default LoginModal;
