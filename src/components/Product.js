import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import DetailsProductModal from "./DetailsProductModal.js";
import swal from "sweetalert";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInWishList: false,
      id: props.id,
      name: props.name,
      image: props.image,
      color: props.color,
      price: props.price,
      description: props.description,
      type: props.type,
      onUpdateCart: props.onUpdateCart
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
    // } else {
    //   var cart = JSON.parse(sessionStorage.getItem("cart"));
    //   console.log(cart);
    //   var newProduct = {
    //     id: this.state.id,
    //     quantity: 1,
    //     name: this.state.name,
    //     price: this.state.price,
    //     image: this.state.image,
    //   };
    //   console.log(newProduct);
    //   if (!cart || cart.products[0] == null) {
    //     cart = { products: [newProduct] };
    //   } else if (cart.products.find(p => p.id == this.state.id)) {
    //     cart.products.map((p) => {
    //       if (p.id == this.state.id) p.quantity = p.quantity + 1;
    //     });
    //   } else {
    //     cart.products.push(newProduct);
    //   }
    //   sessionStorage.setItem("cart", JSON.stringify(cart));
    //   this.state.onUpdateCart(cart.products.length);
    // }
    swal("Success","Product Added Successfully To Cart", "success")
  }
  async intoWishList() {
    this.setState({ isInWishList: true });
  }
  async outOfWishList() {
    this.setState({ isInWishList: false });
  }
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
    return (
      <div  className="row product">
        <div className="col-md-2">
          <img
            style={{
              maxWidth: "inherit",
              maxHeight: "50%",
              borderRadius: "50%",
            }}
            src={path}
            onError={(e) => {
              e.target.src =
                "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
              e.target.onerror = null; // prevents looping
            }}
            alt={this.props.name}
            height="150"
          />
          <div>
            <h5>{this.props.type}</h5>
          </div>
        </div>
        <div className="col-md-2 product-detail">
          <h4>{this.props.name}</h4>
          <div>
            <h5>{this.props.description}</h5>
          </div>
          <div
            className="circle"
            style={{ background: this.props.color }}
          ></div>
        </div>
        <div className="col-md-2 product-detail"></div>
        <div className="col-md-2 product-price">{this.props.price}</div>
        <div className="col-md-1 product-price">
          {this.state.isInWishList ? (
            <FaHeart
              id="inWishList"
              onClick={() => this.outOfWishList()}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegHeart
              id="outWishList"
              onClick={() => this.intoWishList()}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <div className="col-md-1 product-price">
          <FaShoppingCart
            onClick={() => this.intoCart(this.props)}
            style={{ cursor: "pointer" }}
          />
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
