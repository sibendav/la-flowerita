import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Route, NavLink, HashRouter, Routes } from "react-router-dom";
import "../css/resetPassword.css"
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
import swal from 'sweetalert';

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
    trackPromise(
      fetch("/emailForResetPassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("email was sent successfully!");
          this.setState({ emailSent: true , ERROR:""});
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
    ))
     };

  checkToken = async () => {
    let token = document.getElementById("token").value;
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token:token}),
    };
    trackPromise(
      fetch("/checkToken", options).then(res => res.json())
    .then(
      (res ) => {
        console.log(res);
        if (res.status == 200) {
          console.log("token is good!");
          this.setState({id:res.id, tokenChecked: true, ERROR:"" });
          }
        else if (res.status == 404){
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
    ))
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
    trackPromise(
      fetch("/updatePassword", options)
    .then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("update password was successful!");
          swal("Successful!","update password was successful! Please login.", "success")
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
    ))
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

class GetEmailForReset extends Component{
  
  render(){
    return (
      <div id="divForResetPassword" className="container d-flex justify-content-center align-items-center vh-100">
            <LoadingIndicator/>
           <div className="bg-white text-center p-5 mt-3 center">
              <h3>Forgot Password </h3>
              <p>Please enter your email and we will send you a link to reset your password.</p>
              <form className="pb-3" action="#">
                 <div className="form-group">
                    <input name="email" id="email" type="email" className="form-control" placeholder="Your Username*" required/>
                 </div>
                 <h5>{this.props.ERROR}</h5>
              </form>
              <button onClick={() => this.props.resetPasswordFunction()} type="button" className="btn">Reset Password</button>
           </div>
        </div>);
  }
  }
  
class GetToken extends Component{
    
    render(){
      return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
              <LoadingIndicator/>
        <div className="bg-white text-center p-5 mt-3 center">
           <h3>Forgot Password </h3>
           <p>Please enter the token you got to your mail.</p>
           <form className="pb-3" action="#">
              <div className="form-group">
                 <input name="token" id="token" type="text" className="form-control"  required/>
              </div>
              <h5>{this.props.ERROR}</h5>
           </form>
           <button onClick={() => this.props.checkTokenFunction()} type="button" className="btn">Submit</button>
           {/* <NavLink
                style={{cursor:"pointer"}}
                onClick={() => this.checkToken()}
                to="/updatePassword"
              >
                Submit
              </NavLink> */}
        </div>
     </div>);
     }
    }
  
  
class UpdatePassword extends Component{
  
    render() {
      return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
                 <LoadingIndicator/>
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
                 <h5>{this.props.ERROR}</h5>
              </form>
              <button onClick={() => this.props.updatePasswordfunction()} type="button" className="btn">Save</button>
           </div>
        </div>
      );
    }
  }

export default ResetPassword;
