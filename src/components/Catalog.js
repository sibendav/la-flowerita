//components/ProductList.js

import React, { Component } from "react";
import Product from "./Product";
import NewProductModal from "./NewProductModal";
import "../css/catalog.css";
import { FaPlus } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: false,
      type: false,
      wishlist: [],
      showModal:false
    };
  }

  componentDidMount(){
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    trackPromise(
    fetch("/getCatalog", options).then(res => res.json())
    .then((result) => {
      this.setState({ products: result.products });
      // console.log(this.state.products);
    }));
    options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  };
  trackPromise(
    fetch("/getCurrentWishlist", options).then(res => res.json())
    .then((result) => {
      console.log(result.wishlist.products[0]);
      this.setState({ wishlist: result.wishlist.products.map(p => p.id) });
    }));
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
    trackPromise(
    fetch("/getCatalog", options).then(res => res.json())
    .then((result) => {
      this.setState({ products: result.products });
      console.log(this.state.products);
    }));
 }
}
  refreshPage() {
    window.location.reload(false);
  }

  async changeType(e){
    var type = e.target.value;
    this.setState({type:type, products:false});
  }

  render() {
    return (
      <div className="container main-content">      
      <div className="catalog-btn" role="group" aria-label="Basic example">
      <button className="button-la-flowerita" type="button" onClick={() => this.refreshPage()} title="Refresh"><FiRefreshCcw/></button>
      {this.props.degree == "Seller" ?<button className="button-la-flowerita" type="button" onClick={() => this.setState({showModal:true})} title="Add New Product"><FaPlus /></button>:""}
      <button className="button-la-flowerita"  type="button" onClick={(e) => this.changeType(e)} title="Show Flowers Only" value="Flower" >Flowers</button>
      <button className="button-la-flowerita" type="button" onClick={(e) => this.changeType(e)} title="Show Bouquests Only" value="Bouquest">Bouquests</button>
      <button className="button-la-flowerita" type="button" onClick={(e) => this.changeType(e)} title="Show All products" value="All">All</button>
      </div>
      <LoadingIndicator/>
        { this.state.products && this.state.products.length > 0 ? 
        this.state.products.map((product) => {
          return (
            <Product
              degree={this.props.degree}
              id={product._id}
              image={product.image}
              name={product.name}
              color={product.color}
              price={product.price}
              description={product.description}
              type={product.type}
              onUpdateCart={(num) => this.props.onUpdateCart(num)}
              onUpdateWishlist={(num) => this.props.onUpdateWishlist(num)}
              isInWishList={this.state.wishlist.indexOf(product._id) == -1 ? false: true}
              maxAmount={product.maxAmount}
              sellerName={product.sellerId}
            />
          );
        }):""}{ this.state.products && this.state.products.length == 0 ? 
        <h1> There are no products for this category</h1>
      :""}
        <br />
        <br />
        <br />
        <br />
        {this.state.showModal? <NewProductModal showModal={true}/>:""}
      </div>
    );
  }
}

export default ProductList;

