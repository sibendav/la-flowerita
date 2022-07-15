

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

class App extends Component {
    constructor() {
        super();
        this.state = {
          // needed to change
            nav: "About"
        };
    }

    componentDidMount = () => {
        var decodedCookie = decodeURIComponent(document.cookie);
        var allcookies = decodedCookie.split(';');

        for (let i = 0; i < allcookies.length; i++) {

            let cookiename = allcookies[i].split('=')[0];
            let cookievalue = allcookies[i].split('=')[1];

            if (cookiename == "session") {
                if (cookievalue != "no") {
                    let username = cookievalue.split(',')[0];
                    let password = cookievalue.split(',')[1];
                    let role = cookievalue.split(',')[2];

                    this.insession(username, password, role);

                }
            }
        }
        let currenturl = window.location.href;
        console.log(currenturl);
        let baliseurl = currenturl.split("#")[1];
        // if (baliseurl == null) {
            // await resetactive();
            // $("about").addClass('active');
            // $("#content").html("<About></About>");
            // this.state.nav = "About"
            // $(this).scrollTop(0);
        // } else {
        //     // await resetactive();
        //     this.findnav("#" + baliseurl);
        // }
   }

    async insession(name, password) {
        document.cookie = 'session=' + name + ',' + password;
        // let isAdmin = 0;
        // let isWorker = 0;
        await fetch("db/users.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        }).then(response => response.json())
            .then(data => {
                for (const isuser of data) {
                    console.log(name);
                    if (isuser != null && isuser.email == name && isuser.password == password) {
                        if (isuser.degree == "manager") {
                            // isAdmin == 1;
                            console.log("The user is admin!");
                            document.getElementById("users").style.display = "block";
                            document.cookie = 'session=' + name + ',' + password + ',' + 2;

                        } else if (isuser.degree == "worker") {
                            // isWorker == 1;
                            console.log("The user is worker!");
                            document.getElementById("users").style.display = "block";
                            document.cookie = 'session=' + name + ',' + password + ',' + 1;

                        } else {
                            document.cookie = 'session=' + name + ',' + password + ',' + 0;
                            console.log("The user is client!");
                        }


                        document.getElementById("catalog").style.display = "block";

                        document.getElementById("logoutbtn").style.display = "block";
                        document.getElementById("login").style.display = "none";
                        $("#content").load("views/about.html");
                        $("#home").addClass('active');

                    }
                }
            })
};
 
    
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
                          <NavLink className="nav-link active" style={{"fontSize": "initial",display:"none"}} to="/catalog" id="catalog">Flower Catalog</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial"}} to="/contact" id="contact">Contact</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link active" style={{"fontSize": "initial", display:"none"}} to="/users" id="users">Manage Users</NavLink>
                      </li>
                  </ul>
                  <button type="button" className="nav-item ml-auto btn btn-outline-success" id="logoutbtn" style={{display:"none"}}>
                      <a className="nav-link active" href="#logout" id="logout" >Logout</a>
                  </button>

                      <LoginModal />
              </div>
          </div>
      </nav>
  
      <div id="content">
        <Routes>
            <Route exact = "true" path="/" element={<About/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/contact" element={<Contact/>}/>
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
