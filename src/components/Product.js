import {React, Component} from 'react';
import sampleImage from '../logo.svg';
import '../css/catalog.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

class Product extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isInWishList: false,
    }
  } 
  async intoWishList(){
    this.setState({isInWishList: true});
  }
  async outOfWishList(){
    this.setState({isInWishList: false});
  }
  render(){
    return (
        <div className="row product">
          <div className="col-md-2">
            <img src={this.props.image} alt={this.props.name} height="150" />
          </div>
          <div className="col-md-8 product-detail">
            <h4>{this.props.name}</h4>
            <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>
          </div>
          <div className="col-md-8 product-detail">
          <div className="circle" style={{background: this.props.color}}></div>
            </div>
          <div className="col-md-2 product-price">
            {this.props.price}
          </div>
          <div className="col-md-1 product-price">
          { this.state.isInWishList
          ?<FaHeart id="inWishList" onClick={() => this.outOfWishList()} style={{ cursor:"pointer"}}/>
          :<FaRegHeart id="outWishList" onClick={() => this.intoWishList()} style={{cursor:"pointer"}}/>
          }   
          </div>
          <div className="col-md-1 product-price">
          <FaShoppingCart style={{cursor:"pointer"}}/>
          </div>
        </div>
      );
    }
  }

export default Product;