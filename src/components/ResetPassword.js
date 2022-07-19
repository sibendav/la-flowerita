import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Route, NavLink, HashRouter, Routes } from "react-router-dom";
import "../css/resetPassword.css"
class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      ERROR: ""
    };
  }

  resetPassword = async () => {
    // this.setState({ [e.target.name]: e.target.value });
    let email = document.getElementById("email").value;
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email:email}),
    };
    let ok = 404;
    await fetch("/emailForResetPassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("email was sent successfully!");
        }
        else if (res.status == 404){
          console.log("email was not sent!");
          this.setState({ ERROR: "This email is not one of our users" });
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          ERROR: error
        });
      }
    )
     };
  render() {
    return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
         <div className="bg-white text-center p-5 mt-3 center">
            <h3>Forgot Password </h3>
            <p>Please enter your email and we will send you a link to reset your password.</p>
            <form className="pb-3" action="#">
               <div className="form-group">
                  <input name="email" id="email" type="email" className="form-control" placeholder="Your Username*" required/>
               </div>
               <h5>{this.state.ERROR}</h5>
            </form>
            <button onClick={() => this.resetPassword()} type="button" className="btn">Reset Password</button>
         </div>
      </div>
    );
  }
}

export default ResetPassword;
