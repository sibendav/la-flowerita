import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Route, NavLink, HashRouter, Routes } from "react-router-dom";
import "../css/resetPassword.css"
class UpdatePassword extends Component {
  constructor() {
    super();
    this.state = {
      ERROR: ""
    };
  }

  updatePassword = async () => {
    // this.setState({ [e.target.name]: e.target.value });
    let password = document.getElementById("password").value;
    let repass = document.getElementById("repass").value;
    if(password != repass){
        this.setState({ ERROR: "This passwords are not the same" });
    }
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({password:password}),
    };
    let ok = 404;
    await fetch("/updatePassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("update password was successful!");
          document.location.href = "/";
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
            <h3>Change Password </h3>
            <p>Please enter a new paswword.</p>
            <form className="pb-3" action="#">
               <div className="form-group">
                  <input name="password" id="password" type="password" className="form-control" placeholder="Your Password*" required/>
               </div>
               <div className="form-group">
                  <input name="repass" id="repass" type="password" className="form-control" placeholder="Write It Again*" required/>
               </div>
               <h5>{this.state.ERROR}</h5>
            </form>
            <button onClick={() => this.updatePassword()} type="button" className="btn">Save</button>
         </div>
      </div>
    );
  }
}

export default UpdatePassword;
