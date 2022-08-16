

import React, {Component} from 'react';
import {
    Route,
    NavLink,
    HashRouter,
    Routes
  } from "react-router-dom";
import {render} from 'react-dom';
import { createRoot } from 'react-dom/client';
import $ from 'jquery'; 
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import Contact from './components/Contact.js';
import Catalog from './components/Catalog.js';
import About from './components/About.js';
import LoginModal from './components/LoginModal.js';
import SignupModal from './components/SignupModal.js';
import ResetPassword from './components/ResetPassword.js';
import ProductList from './components/Catalog.js';
import ShoppingCart from './components/ShoppingCart.js';
import Wishlist from './components/Wishlist.js';
import NoPermission from './components/NoPermission.js';

import UserList from './components/ManageUsers';
import ManageOrders from './components/ManageOrders';
import MyOrders from './components/MyOrders';

import PreChat from './components/PreChat.js';
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";


//import icons from react icons
import { FaList, FaMailBulk, FaHeart, FaQuestion, FaUsers } from "react-icons/fa";
// import {BiLogOut} from "react-icons/bi";
import {
  FiHome,
  FiLogOut,
  FiArrowUpCircle,
  FiArrowDownCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            ERROR: "", 
            profileImage: false,
            numOfProductsInCart: false,
            numOfProductsInWishlist: false,
            menuCollapse: false

        };
    }

    componentDidMount = async() => {
        var options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
        await fetch("/getSession", options).then( res => res.json()).then(
            (result) => {
              console.log(result)
                this.setState({
                loggedIn: result.isLogged,
                profileImage: result.profileImage || "",
                numOfProductsInCart: result.cart.products.length,
                numOfProductsInWishlist: result.wishlist.products.length
              });
              // localStorage.setItem("user", JSON.stringify(result.user));
              // const saved = localStorage.getItem("user");
              // const initialValue = JSON.parse(saved);
              // console.log(initialValue);
            
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

        // let currenturl = window.location.href;
   }
    
   async onUpdateCart(num){
    this.setState({
      numOfProductsInCart: num
    });
  }
    async onUpdateWishlist(num){
      this.setState({
        numOfProductsInWishlist: num
      });
   }
    logout = async () =>{
        var options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
        await fetch("/logout", options).then(
            (result) => {
              this.setState({
                loggedIn: false,
                user: false}
                //because setState is async function
                , () => {
                  this.refresh();
                })   
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                ERROR: error
              }, () => {
                console.log(error);
            })
            }
          )
        }
      arrayBufferToBase64(buffer) {
          var binary = '';
          var bytes = [].slice.call(new Uint8Array(buffer.data));
          bytes.forEach((b) => binary += String.fromCharCode(b));
          return window.btoa(binary);
      };
      refresh = () => {
        window.location.reload(false);
      }
      async setMenuCollapse(){
        this.setState({menuCollapse: !this.state.menuCollapse})
      }
    render() {
      var path = "";
      console.log(this.state.profileImage)
      try{
        path = "data:/" + this.state.profileImage.contentType + ";base64," + this.arrayBufferToBase64(this.state.profileImage.data)
      } 
      catch(e){
      console.log("couldn't find path of profile image");
      }
      return (
        <div>
          <HashRouter>
            <nav 
              className="navbar navbar-expand-lg"
              style={{
                backgroundColor: "#e3f2fd",
                marginBottom: "auto",
                marginInline: "auto",
                marginTop: "auto",
              }}
            >
              {this.state.menuCollapse ? <FiArrowDownCircle style={{cursor:"pointer"}} onClick={() => this.setMenuCollapse()}/> : <FiArrowUpCircle style={{cursor:"pointer"}} onClick={() => this.setMenuCollapse()}/>}
              <div className="container-fluid">
                <a className="navbar-brand" exact="true" to="/">
                  <img className="avatar" src="images/flower_shop.png" height="60" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}
                        aria-current="page"
                        to="/about"
                        id="about"
                      >
                        {this.state.menuCollapse ? "" :"About "}<FaQuestion />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}
                        to="/catalog"
                        id="catalog"
                        title="Catalog"
                      >
                        {this.state.menuCollapse ? "": "Flower Catalog "}<FaList /> 
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}
                        to="/contact"
                        id="contact"
                        title="Contact"
                      >
                        {this.state.menuCollapse ? "" :"Contact "}<FaMailBulk />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}//, display: "none"
                        to="/users"
                        id="users"
                        title="Users"
                      >
                        {this.state.menuCollapse ? "" : "Manage Users "}<FaUsers />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}//, display: "none"
                        to="/orders"
                        id="orders"
                        title="Orders"
                      >
                        {this.state.menuCollapse ? "" : "Manage Orders "}<FaUsers />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}//, display: "none"
                        to="/myOrders"
                        id="myOrders"
                        title="myOrders"
                      >
                        {this.state.menuCollapse ? "" : "My Orders "}<FaUsers />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}
                        to="/cart"
                        id="cart"
                      >
                        {this.state.menuCollapse ? "" : "Cart"}<i class="fa" style={{ "font-size": "24px" }}>
                          &#xf07a;
                        </i>  
                        <span className="badge badge-warning" id="lblCartCount">
                          {""}
                          {this.state.numOfProductsInCart}{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        style={{ fontSize: "initial" }}
                        to="/wishlist"
                        id="users"
                      >
                        {this.state.menuCollapse ?""
                        : "Wish List"}<i class="fa" style={{ "font-size": "24px" }}>
                        <FaHeart
                          style={{ cursor: "pointer" }}
                        /></i> 
                        <span className="badge badge-warning" id="lblCartCount">
                          {" "}
                          {this.state.numOfProductsInWishlist}{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                          <NavLink
                              className="nav-link"
                              style={{fontSize: "initial"}}
                              to="/Chat"
                              id="users"
                          >
                              {this.state.menuCollapse ? ""
                                  : "chat"}
                              <i class="fa fa-comments" style={{"font-size": "24px"}}/>

                          </NavLink>
                      </li>
                  </ul>
                  <button
                    type="button"
                    className="button-17"
                    id="logoutbtn"
                    style={{ display: this.state.loggedIn ? "block" : "none" }}
                    onClick={() => this.logout()}
                    title="Log Out"
                  >
                    {this.state.menuCollapse ? "" :"Logout"}<FiLogOut />
                  </button>
                  {this.state.loggedIn ? (
                    <img
                      src={path}
                      className="avatar"
                      onError={(e) => {
                        e.target.src =
                          "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                        e.target.onerror = null; // prevents looping
                      }}
                      alt={this.props.name}
                      height="150"
                    />
                  ) : (
                    ""
                  )}
                  <LoginModal
                    reloadNavbar={this.refresh}
                    showButton={this.state.loggedIn ? "none" : "block"}
                    menuCollapse={this.state.menuCollapse}
                  />
                  <SignupModal
                    showButton={this.state.loggedIn ? "none" : "block"}
                    menuCollapse={this.state.menuCollapse}
                  />
                </div>
              </div>
            </nav>

            <div id="content">
              <Routes>
                <Route exact="true" path="/" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/catalog" element={<ProductList onUpdateWishlist={(num) => this.onUpdateWishlist(num)} onUpdateCart={(num) => this.onUpdateCart(num)}/>} />
                <Route path="/cart" element={<ShoppingCart onUpdateCart={(num) => this.onUpdateCart(num)}/>} />
                <Route path="/wishlist" element={<Wishlist onUpdateCart={(num) => this.onUpdateCart(num)} onUpdateWishlist={(num) => this.onUpdateWishlist(num)}/>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/NoPermission" element={<NoPermission />} />

                <Route path="/users" element={<UserList />} />

                <Route path="/orders" element={<ManageOrders />} />
                <Route path="/myOrders" element={<MyOrders />} />

                <Route path="/Chat" element={<PreChat />} />

              </Routes>
            </div>

            <footer
              className="container-fluid text-center"
              style={{ backgroundColor: "#e3f2fd", float: "bottom" }}
            >
              <p>© Simha Franko & Adi Malachi Yosef 2022</p>
            </footer>
          </HashRouter>
        </div>
      );
    }
}

// createRoot(<App/>, document.getElementById('root'));

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);
// serviceWorkerRegistration.register();









// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
