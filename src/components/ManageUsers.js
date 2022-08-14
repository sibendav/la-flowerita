//components/ProductList.js

import React, { Component } from "react";
import User from "./User";
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
    await fetch("/getUsers", options).then(res => {console.log(res);res.json()})
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
    await fetch("/http://localhost:5000/getUsers", options).then(res => res.json())
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
        <button type="button" onClick={(e) => this.changeType(e)} value="Workers" className="button-17">Workers</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="Clients" className="button-17">Clients</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="All" className="button-17">All</button>
        <button type="button" onClick={() => this.refreshPage()} style={{"width":"10%","height":"5%",margin:"20px"}}>
          <span><img src="images/refresh.png" style={{"height":"auto",width:"20%"}}/></span>&nbsp;Refresh
      </button>
      </div>
        { !this.state.users || this.state.users.length > 0 ? 
        this.state.users.map((user) => {
          return (
            <User
              id={user._id}
              name={user.name}
              degree={user.degree}
              phone = {user.phone}
              address = {user.address}
              email={user.email}
            />
          );
        }): <h1> There are no users for this category</h1>
      }
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default UserList;

