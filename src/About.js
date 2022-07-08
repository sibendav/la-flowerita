import React, { Component } from "react";
import './css/about.css';

class About extends Component {
  render() {
    return (
        <div>
        <link rel="stylesheet" href="css/about.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://getbootstrap.com/docs/5.2/components/carousel/"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
        <div class="about-section">
                <h1 >Welcome to The Flower Shop!</h1>
                <h2>About Us</h2>
                <p>Our store was established in 1970.</p>
                <p>Since then we specialize in creating the most beautiful bouquets for any occasion you need:</p>
                <p>A wedding, engagement or if you want to show your love to someone</p>
                <p>We have delivery services all over the country</p>
                <p>All at the best prices on the market</p>
                <p>So just go to our bouquet catalog and choose your favorite bouquet and we will continue from there ..</p>
                <p>For any question, request or problem, contact us at the button above and we will get back to you as soon as possible.</p>
        </div>
        <div class="carousel slide center" id="carouselExampleInterval"  data-bs-ride="carousel" style={{"width":"30%", "height": "30%"}}>
            <div class="carousel-inner" >
                <div class="carousel-item active" data-bs-interval="5000">
                    <img src="../images/1.JPG" class="d-block w-100"/>
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img src="../images/2.JPG" class="d-block w-100"/>
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                    <img src="../images/3.JPG" class="d-block w-100"/>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    );
  }
}
 
export default About;