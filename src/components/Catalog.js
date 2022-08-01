//components/ProductList.js

import React, { Component } from "react";
import Product from "./Product";
import NewProductModal from "./NewProductModal";



class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      type: false
    };
  }

  componentDidMount = async() => {
    var type = this.state.type ? this.state.type : "All";
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({type: type})
    };
    console.log(type);
    await fetch("/getCatalog", options).then(res => res.json())
    .then((result) => {
      this.setState({ products: result.products });
      console.log(this.state.products);
    });
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
    await fetch("/getCatalog", options).then(res => res.json())
    .then((result) => {
      console.log("hi");
      this.setState({ products: result.products });
      console.log(this.state.products);
    });
 }
}
  refreshPage() {
    window.location.reload(false);
  }

  async changeType(e){
    var type = e.target.value;
    this.setState({type:type});
  }

  render() {
    return (
      <div className="container main-content">
        <NewProductModal />
        
      <div style={{"marginTop":"inherit"}} class="btn-group" role="group" aria-label="Basic example">
        <button type="button" onClick={(e) => this.changeType(e)} value="Flower" className="button-17">Flowers</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="Bouquest" className="button-17">Bouquest</button>
        <button type="button" onClick={(e) => this.changeType(e)} value="All" className="button-17">All</button>
        <button type="button" onClick={() => this.refreshPage()} style={{"width":"10%","height":"5%",margin:"20px"}}>
          <span><img src="images/refresh.png" style={{"height":"auto",width:"20%"}}/></span>&nbsp;Refresh
      </button>
      </div>
        { !this.state.products || this.state.products.length > 0 ? 
        this.state.products.map((product) => {
          return (
            <Product
              id={product._id}
              image={product.image}
              name={product.name}
              color={product.color}
              price={product.price}
              description={product.description}
              type={product.type}
              onUpdateCart={(num) => this.props.onUpdateCart(num)}
            />
          );
        }): <h1> There are no products for this category</h1>
      }
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ProductList;

