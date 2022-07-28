import {React, Component} from 'react';
import sampleImage from '../logo.svg';
import '../css/catalog.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import DetailsProductModal from "./DetailsProductModal.js"
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
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  render(){
    
    var path = "data:/" + this.props.image.contentType + ";base64," + this.arrayBufferToBase64(this.props.image.data)
    return (
        <div Key={this.props.id} className="row product">
          <div className="col-md-2">          
         <img style={{"maxWidth": "inherit", "maxHeight": "50%","borderRadius":"50%"}} src={path} 
        onError={( e ) => {
          e.target.src='https://www.freeiconspng.com/uploads/no-image-icon-11.PNG';
          e.target.onerror = null; // prevents looping
        }}
                         alt={this.props.name} height="150" />
          </div>
          <div className="col-md-2 product-detail">
            <h4>{this.props.name}</h4>
            <div><h5>{this.props.description}</h5></div>
            <div className="circle" style={{background: this.props.color}}></div>
          </div>
          <div className="col-md-2 product-detail">
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
          <div className="col-md-1 product-price">
            <DetailsProductModal 
            id={this.props.id}
            image={this.props.image}
            path={path}
            name={this.props.name}
            color={this.props.color}
            price={this.props.price}
            description={this.props.description}
            type={this.props.type}
            />
          </div>
        </div>
      );
    }
  }

export default Product;