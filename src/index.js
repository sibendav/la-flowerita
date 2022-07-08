

import React, {Component} from 'react';
import {render} from 'react-dom';
import About from './About';
import $ from 'jquery'; 
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css'
// import Contact from './components/Contact';
// import Catalog from './components/Catalog';

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
        if (baliseurl == null) {
            // await resetactive();
            // $("about").addClass('active');
            // $("#content").html("<About></About>");
            this.state.nav = "About"
            $(this).scrollTop(0);}
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
 

    findnav(link) {
        alert("I am in")
        if (link == "#about") {
            $("#about").addClass('active');
            $("#content").load("views/about.html");
            $(this).scrollTop(0);
        }
        if (link == "#contact") {
            $("#contact").addClass('active');
            $("#content").load("views/contact.html");
            $(this).scrollTop(0);
        }
        if (link === "#catalog") {
            $("#shops").addClass('active');
            $("#content").load("views/catalog.html");
            $(this).scrollTop(0);
        }
        if (link == "#users") {
            $("#users").addClass('active');
            $("#content").load("views/users.html");
            $(this).scrollTop(0);
        }
        if (link == "#logout") {
            document.cookie = 'session=no';
            document.location.href = "index.html";
        }
    };

    // displayable() {
    //     var elements = []
    //     elements.push(document.getElementById("about"));
    //     elements.push(document.getElementById("contact"));
    //     elements.push(document.getElementById("catalog"));
    //     elements.push(document.getElementById("users"));
    //     for (const el of elements) {
    //         if (el.style.display != "none") {
    //             el.classList.remove("active");
    //         }
    //     }
    // }
    
    render() {
        return (
        <div>
          <nav class="navbar navbar-expand-lg"  style={{"background-color": "#e3f2fd", "margin-bottom": "auto","margin-inline": "auto","margin-top": "auto"}}>
          <div class="container-fluid">
              <a class="navbar-brand" href="#"><img src="images/flower_shop.png" height="60"/>Flowers Shop</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class="nav-link active" style={{"font-size": "initial"}} aria-current="page" href="#about" id="about">About</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link active" style={{"font-size": "initial",display:"none"}} href="#catalog" id="catalog">Flower Catalog</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link active" style={{"font-size": "initial"}} href="#contact" id="contact">Contact</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link active" style={{"font-size": "initial", display:"none"}} href="#users" id="users">Manage Users</a>
                      </li>
                  </ul>
                  <button type="button" class="nav-item ml-auto btn btn-outline-success" id="logoutbtn" style={{display:"none"}}>
                      <a class="nav-link active" href="#logout" id="logout" >Logout</a>
                  </button>
                  <button style={{"float":"right"}} type="button" id="login" class="nav-item ml-auto btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#myModal">
                      Login
                  </button>
              </div>
          </div>
      </nav>
  
      <div id="content"><About></About>
      </div>
  
      <footer class="container-fluid text-center" style={{"background-color": "#e3f2fd", float: "bottom"}}>
          <p>© Simha Franko & Adi Malachi Yosef 2022</p>
      </footer>
  
  
  <div id="myModal" class="modal fade">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <img src="images\login.png" width="72" height="72"/>
                  <h5 class="modal-title" id="exampleModalLabel">Please sign in</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form>
                      <div class="mb-3">
                          <input type="email" name="username" id="username" class="form-control" placeholder="Email address" required autofocus/>
                      </div>
                      <div class="mb-3">
                          <input type="password" name="password" id="password" class="form-control" placeholder="Password" required/>
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                  <button class="btn btn-lg btn-primary btn-block" onclick="dofetch()" type="submit">Sign in</button>
              </div>
          </div>
      </div>
  
  </div>
  </div>
  
        );
    }
}

render(<App/>, document.getElementById('root'));
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
