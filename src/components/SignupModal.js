import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import '../css/newProductModal.css';

class SignupModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      user: {
        email: "",
        password: "",
        degree: "",
        name: "", 
        phone: "",
        address: "",
        picture: false,
        src: false,
    },
      ERROR: "",
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  async signup() {
    alert("hii");
    // check inputs
    var email = this.state.email;
    var password = this.state.password;
    var degree = this.state.degree;
    var name = this.state.name;
    var phone = this.state.phone;
    var address = this.state.address;
    var re_pass = document.getElementById("re_pass").value;
    if (email == "" || password == "" || degree== undefined || name == "" || phone == "" || address == "") {
      this.setState({ ERROR: "Please fill all the fields" });
      return;
    }
    if (!email.includes("@")) {
      this.setState({ ERROR: "Email is not valid." });
      return;
    }
    if(re_pass != password){
      this.setState({ ERROR: "Passwords don't match each other" });
      return;
    }
    // pass inputs to server
    let user = { email, password, degree, name, phone, address };
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({user: user}),
    };
    var id = 0;
    await fetch("/signup", options).then(res => res.json())
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          id = res.id;
        }
        else if(res.status == 409){
          this.setState({ ERROR: "Email already exists." });
          return;
        }
        else if(res.status == 400){
          this.setState({ ERROR: "There was an error. Please try again" });
          return;
        }
        else if(res.status == 422){
          this.setState({ ERROR: "Please fill all the fields correctly." });
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
    if (id != 0) {
      if (!this.state.picture) {
        alert("you signedup successfully! You may login to your account");
        document.location.href = "/";
      }
      if (
        this.state.picture.type.includes("png") ||
        this.state.picture.type.includes("jpg")
      ) {
        this.setState({ ERROR: "Only types: PNG or JPG" });
        return;
      }
      var myFormData = new FormData();
      myFormData.append("file", this.state.picture);
      myFormData.append("id", id);

      const response = await fetch("/addUserProfile", {
        method: "POST",
        body: myFormData,
      });
      if (response.status == 200) {
        alert("you signedup successfully! You may login to your account");
        document.location.href = "/";
      }
    } else {
      alert("Didn't get id");
    }
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src} style={{"max-width": "inherit", "max-height": "inherit"}}/>
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
    this.setState({ [e.target.name]: document.querySelector(`input[name=${e.target.name}]:checked`).id});
  };
  render() {
    return (
      <div>
        <Button
          style={{ display: this.props.showButton }}
          className="button-17"
          onClick={() => this.handleShow()}
        >
          Signup
        </Button>
        <Modal
          style={{ opacity: 1 }}
          show={this.state.showModal}
          onHide={() => this.handleClose()}
        >
          <Modal.Header>
            <Modal.Title>
              <div className="modal-header">
                {/* <img src="images\login.png"/> */}
                <h5 className="modal-title" id="exampleModalLabel">
                  Sign up
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
                  placeholder="Full name"
                  onChange={this.inputsHandler}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="Phone"
                  onChange={this.inputsHandler}
                  required
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
                  required
                />
              </div>
              <div className="mb-3">
              <input type="radio" name="degree" id="Customer" onChange={this.radioHandler}/>
              <label for="rd1">Customer</label>
              <input type="radio" name="degree" id="Saler" onChange={this.radioHandler}/>
              <label for="rd2">Saler</label>
              <input type="radio" name="degree" id="Manager" onChange={this.radioHandler}/>
              <label for="rd2">Manager</label>
              </div>
              <div className="mb-3">
              {/* <span><i aria-hidden="true" class="fa fa-envelope"></i></span> */}
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
              <div className="mb-3">
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={this.inputsHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <h2>Upload Profile Image</h2>
                <input 
                  name="file"  
                  id="file"
                  type="file"
                  onChange={this.handlePictureSelected.bind(this)}
                />
                <br/>
                <div style={{"max-width": "80%", "max-height": "80%"}}>
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
                className="btn btn-lg btn-primary btn-block"
                onClick={() => this.signup()}
                type="submit"
              >
                Sign up
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

export default SignupModal;
