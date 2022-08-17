//components/ProductList.js

import React, { Component } from "react";
import User from "./User";
import "../css/users.css";
//import NewProductModal from "./NewProductModal";
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
import { FiRefreshCcw } from "react-icons/fi";


class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: false,
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
    trackPromise(fetch("/getUsers", options).then(res => res.json())
    .then((result) => {
      console.log(result); 
      this.setState({ users: result.users });
      console.log(this.state.users);
    }));
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
    trackPromise(fetch("/getUsers", options).then(res => res.json())
    .then((result) => {
      console.log("hi");
      this.setState({ users: result.users });
      console.log(this.state.users);
    }));
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

        <div className="catalog-btn"role="group" aria-label="Basic example">
        
        <button type="button" className="button-la-flowerita" onClick={(e) => this.changeType(e)} value="All">All</button>
        <button type="button" className="button-la-flowerita" onClick={(e) => this.changeType(e)} value="Seller">Sellers</button>
        <button type="button" className="button-la-flowerita" onClick={(e) => this.changeType(e)} value="Customer">Customers</button>
        <button type="button" className="button-la-flowerita" onClick={(e) => this.changeType(e)} value="NotApproved" >Not Approved</button>
        <button className="button-la-flowerita" type="button" onClick={() => this.refreshPage()} title="Refresh"><FiRefreshCcw/></button>

      </div>
       <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
          <div className="container mt-3 mb-4">
          <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="row">
                <div className="col-md-12">
                  <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                    <table className="table manage-candidates-top mb-0">
                    
                      <thead>
                      <tr>
                        <th>User Name</th>
                        <th class="text-center">Status</th>
                        <th class="action text-right">Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <LoadingIndicator/>
                        { this.state.users || this.state.users.length > 0 ? 
                          this.state.users.map((user) => {
                            return (
                              <User
                                _id = {user._id}
                                key = {user._id}
                                user = {user}
                                name={user.name}
                                degree={user.degree}
                                phone = {user.phone}
                                address = {user.address}
                                email={user.email}
                                isApproved = {user.isApproved}
                                profileImage = {user.profileImage}
                              />
                              
                            );
                          }) :""}{ this.state.users && this.state.users.length == 0 ? 
                            <h1> There are no users for this category</h1>
                          :""}
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

