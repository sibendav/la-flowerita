import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import DetailsProductModal from "./DetailsProductModal.js";
import swal from "sweetalert";
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
class Product extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isInWishList: props.isInWishList,
      id: props.id,
      name: props.name,
      image: props.image,
      color: props.color,
      price: props.price,
      description: props.description,
      type: props.type,
      maxAmount: props.maxAmount,
      onUpdateCart: props.onUpdateCart,
      onUpdateWishlist: props.onUpdateWishlist,
      showModal:false
    };
  }
  
  async intoCart(props) {
    console.log(this.state);
      var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: this.state.id }),
      };
        await fetch("/addNewProductToCart", options).then(res => res.json()).then(
        (result) => {
          if (result.status == 200) {
            this.state.onUpdateCart(result.cart.products.length);
            swal("Success!", "Product Added To Cart!", "success");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  async intoWishList() {
    console.log(this.state);
      var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: this.state.id }),
      };
        await fetch("/addNewProductToWishlist", options).then(res => res.json()).then(
        (result) => {
          if (result.status == 200) {
            this.state.onUpdateWishlist(result.wishlist.products.length);
            this.setState({ isInWishList: true });
            swal("Success!", "Product Added To Wish List!", "success");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  async outOfWishList() {
    console.log(this.state);
      var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: this.state.id }),
      };
        await fetch("/deleteProductFromWishlist", options).then(res => res.json()).then(
        (result) => {
          if (result.status == 200) {
            this.state.onUpdateWishlist(result.wishlist.products.length);
            this.setState({ isInWishList: false });
            swal("Success!", "Product Removed From Wish List!", "success");
          }
        },
        (error) => {
          console.log(error);
        }
      );  }
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    var path =
      "data:/" +
      this.props.image.contentType +
      ";base64," +
      this.arrayBufferToBase64(this.props.image.data);
    return (<div class="column">
    <div class="product-img">
      <img src={path} onError={(e) => {
              e.target.src =
                "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
              e.target.onerror = null; // prevents looping
            }}/>
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>{this.props.name}</h1>
        <h2>Seller {this.props.sellerName}</h2>
        <p>{this.props.description}</p>
      </div>
      <div class="product-price-btn">
        <p><span className=".product-span">{this.props.price}</span>$</p>
          {this.state.isInWishList ? (
            <button type="button"  onClick={() => this.outOfWishList()}>
            <FaHeart
              id="inWishList"
              style={{ cursor: "pointer" }}
            />
                </button>
          ) : (
            <button type="button" onClick={() => this.intoWishList()} >
            <FaRegHeart
              id="outWishList"
              style={{ cursor: "pointer" }}
            />
                </button>
          )}
    <button type="button" onClick={() => this.intoCart(this.props)}>
      <FaShoppingCart
          style={{ cursor: "pointer" }}
        />
    </button>
    <button  type="button" onClick={() => this.setState({showModal:true})}>
        <FaEye/>
        {this.state.showModal? <DetailsProductModal id={this.props.id}
            image={this.props.image}
            path={path}
            name={this.props.name}
            color={this.props.color}
            price={this.props.price}
            description={this.props.description}
            type={this.props.type}
            maxAmount={this.state.maxAmount}
            sellerName={this.state.sellerName}
            showModal={true}
          />: ""}
      </button>
      </div>
    </div>
  </div>);

  }
}

export default Product;
