import React, { Component } from "react";
class GetEmailForReset extends Component{
  
  render(){
    return (
      <div id="divForResetPassword" className="container d-flex justify-content-center align-items-center vh-100">
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

  export { GetToken, GetEmailForReset, UpdatePassword }
