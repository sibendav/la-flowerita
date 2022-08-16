//components/ProductList.js

import React, { Component } from "react";
import User from "./User";
import "../css/users.css";
import LoadingIndicator from "./Spinner";
//import NewProductModal from "./NewProductModal";



class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      type: false
    };
  }

  componentDidMount = async() => {
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    await fetch("/getUsers", options).then(res => res.json())
    .then((result) => {
      console.log(result); 
      this.setState({ users: result.users });
      console.log(this.state.users);
    });
  }

  componentDidUpdate = async(prevProps,prevState) =>  {
    if (this.state.type !== prevState.type) {
    console.log('type changed');
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    await fetch("/getUsers", options).then(res => res.json())
    .then((result) => {
      console.log("hi");
      this.setState({ users: result.users });
      console.log(this.state.users);
    });
 }
}
  refreshPage() {
    window.location.reload(false);
  }

  async changeType(e){
    var type = e.target.value;
    this.setState({type:type});
  }

  render() {
    return (
      <div className="container main-content">
      <div style={{"marginTop":"inherit"}} class="btn-group" role="group" aria-label="Basic example">
        <button type="button" onClick={(e) => this.changeType(e)} value="Seller" className="button-17">Sellers</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="Customer" className="button-17">Customers</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="All" className="button-17">All</button>
        <button type="button" onClick={() => this.refreshPage()} style={{"width":"10%","height":"5%",margin:"20px"}}>
          <span><img src="images/refresh.png" style={{"height":"auto",width:"20%"}}/></span>&nbsp;Refresh
      </button>
      </div>
       <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
          <div class="container mt-3 mb-4">
          <div class="col-lg-9 mt-4 mt-lg-0">
              <div class="row">
                <div class="col-md-12">
                  <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                    <table class="table manage-candidates-top mb-0">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                        { !this.state.users || this.state.users.length > 0 ? 
                          this.state.users.map((user) => {
                            return (
                              <User
                                key = {user.id}
                                user = {user}
                                name={user.name}
                                degree={user.degree}
                                phone = {user.phone}
                                address = {user.address}
                                email={user.email}
                                profileImage = {user.profileImage}
                              />
                              
                            );
                          }) :""}{ this.state.users && this.state.users.length == 0 ? 
                            <h1> There are no users for this category</h1>
                          :""}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default UserList;

