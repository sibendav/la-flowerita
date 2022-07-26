

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

class App extends Component {
    constructor() {
        super();
        this.state = {
          // needed to change
            loggedIn: false,
            ERROR: ""
        };
    }

    componentDidMount = async() => {
        var options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
        await fetch("/getCurrentUser", options).then( res => res.json()).then(
            (result) => {
              this.setState({
                loggedIn: true
              });
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
    
    logout = async () =>{
        var options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
        await fetch("/logout", options).then(
            (result) => {
              this.setState({
                loggedIn: false}
                //because setState is async function
                , () => {
                    console.log(result);
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

    render() {
        return (
        <div>
        <HashRouter>
            <nav className="navbar navbar-expand-lg"  style={{"backgroundColor": "#e3f2fd", "marginBottom": "auto","marginInline": "auto","marginTop": "auto"}}>
          <div className="container-fluid">
              <a className="navbar-brand" exact="true" to="/"><img src="images/flower_shop.png" height="60"/>Flowers Shop</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial"}} aria-current="page" to="/about" id="about">About</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial"}} to="/catalog" id="catalog">Flower Catalog</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial"}} to="/contact" id="contact">Contact</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial", display:"none"}} to="/users" id="users">Manage Users</NavLink>
                      </li>
                  </ul>
                  <button type="button" className="nav-item ml-auto btn btn-outline-success" id="logoutbtn" style={{display:this.state.loggedIn ? "block": "none"}}>
                      <a className="nav-link active" onClick={() => this.logout()} id="logout" >Logout</a>
                  </button>

                      <LoginModal showButton={this.state.loggedIn ? "none": "block"} />
                      <SignupModal showButton={this.state.loggedIn ? "none": "block"}/>

              </div>
          </div>
      </nav>
  
      <div id="content">
        <Routes>
            <Route exact = "true" path="/" element={<About/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/catalog" element={<ProductList />}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            

        </Routes>
      </div>

  
      <footer className="container-fluid text-center" style={{"backgroundColor": "#e3f2fd", float: "bottom"}}>
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
