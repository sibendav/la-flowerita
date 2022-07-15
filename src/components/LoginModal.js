import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      username: "",
      password: "",
      ERROR: "",
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  async dofetch() {
    alert("hii");

    // check inputs
    var username = this.state.username;
    var password = this.state.password;
    if (username == "" || password == "") {
      this.setState({ ERROR: "Please fill all the fields" });
      return;
    }
    if (!username.includes("@")) {
      this.setState({ ERROR: "Please fill all the fields correctly" });
      return;
    }

    // pass inputs to server
    let user = { username, password };
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    
    let ok = 404;
    await fetch("/auth", options)
      .then(function (res) {
        if (res.ok) {
          ok = 200;
          console.log(ok);
        }
      })
      .catch((e) => this.setState({ ERROR: "There is an error: " + e }));
    // if ok - pass him to his personal space
    if (ok == 200) {
      // document.cookie = "session=" + username + "," + password;
      // document.location.href = "/";
      alert("you logged successfully");
    } else {
      this.setState({ ERROR: "There is no such user" });
    }
  }


  inputsHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    alert(e.target.value);
  };
  render() {
    return (
      <div>
        <Button
          className="nav-item ml-auto btn btn-outline-success"
          onClick={() => this.handleShow()}
        >
          Login
        </Button>
        {/* <button style={{"float":"right"}} type="button" id="login"  data-bs-toggle="modal" data-bs-target="#myModal">
                      Login */}

        <Modal
          style={{ opacity: 1 }}
          show={this.state.show}
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
                  name="username"
                  id="username"
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
            <h3>{this.state.ERROR}</h3>
            <div className="modal-footer">
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={() => this.dofetch()}
                type="submit"
              >
                Sign in
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
