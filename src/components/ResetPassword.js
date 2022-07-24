import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Route, NavLink, HashRouter, Routes } from "react-router-dom";
import "../css/resetPassword.css"
import { GetToken, GetEmailForReset, UpdatePassword } from './UpdatePassword.js';


class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      emailSent: false,
      emailReceived: false,
      tokenChecked: false,
      id: null,
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
    await fetch("/emailForResetPassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("email was sent successfully!");
          this.setState({ emailSent: true });
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

  checkToken = async () => {
    let token = document.getElementById("token").value;
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token:token}),
    };
    await fetch("/checkToken", options).then(res => res.json())
    .then(
      (res ) => {
        console.log(res);
        if (res.status == 200) {
          console.log("token is good!");
          this.setState({id:res.id, tokenChecked: true });
          }
        else if (res.status == 400){
          console.log("token not good!");
          this.setState({ ERROR: "This is not correct. Please try again" });
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

  updatePassword = async () => {
    // this.setState({ [e.target.name]: e.target.value });
    let password = document.getElementById("password").value;
    let repass = document.getElementById("repass").value;
    if(password != repass){
        this.setState({ ERROR: "This passwords are not the same" });
        return;
    }
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({password:password, id: this.state.id}),
    };
    await fetch("/updatePassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("update password was successful!");
          alert("update password was successful! Please login.")
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
    if(!this.state.emailSent){
    return (<GetEmailForReset resetPasswordFunction={this.resetPassword} ERROR={this.state.ERROR}></GetEmailForReset>
    );
  }
      else if (!this.state.emailReceived && !this.state.tokenChecked){
        return (<GetToken checkTokenFunction={this.checkToken} ERROR={this.state.ERROR}></GetToken>);   
    
  }
  else if(this.state.tokenChecked){
    return (<UpdatePassword updatePasswordfunction={this.updatePassword} ERROR={this.state.ERROR}></UpdatePassword>);   

  }
}
}



export default ResetPassword;
