//components/ProductList.js

import React, { Component } from "react";
import Product from "./Product";
import NewProductModal from "./NewProductModal";

import { FaPlus } from "react-icons/fa";


class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    fetch("/getCatalog", options).then(res => res.json())
    .then((result) => {
      this.setState({ products: result.products });
      console.log(this.state.products);
    });
  }
  render() {
    return (
      <div className="container main-content">
        <NewProductModal />
        {this.state.products.map((product) => {
          return (
            <Product
              id={product.id}
              image={product.image}
              name={product.name}
              color={product.color}
              price={product.price}
              description={"bla bla bla"}
            />
          );
        })}
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ProductList;

// import React, { Component } from "react";

// class Catalog extends Component {
//   render() {
//     return (
//         <div>
// <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
//     <h1 style="font-size: xxx-large; align-content: center">Flower Catalog</h1>
// </div>
// <div className="container px-4 px-lg-5 mt-5">
//     <div id='myCatalog' className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
//     <br/>
//     <br/>
//     <br/>
// {/* <script type="text/javascript">
//     $.ajax({
//         url: 'db/products.json',
//         dataType: 'json',
//         success: function (data) {
//             for (var i = 0; i < data.length; i++) {
//                 var row = $(`<div className="col mb-5">
//     <div className="card h-100">
//         <img className="card-img-top" src="${data[i].image}" height="400" width="300"/>
//         <div className="card-body p-4">
//             <div className="text-center">
//                 <h5 className="fw-bolder">${data[i].name}</h5>
//                 <div className="d-flex justify-content-center small text-warning mb-2">
//                     <div className="bi-star-fill"></div>
//                     <div className="bi-star-fill"></div>
//                     <div className="bi-star-fill"></div>
//                     <div className="bi-star-fill"></div>
//                     <div className="bi-star-fill"></div>
//                 </div>
//                 ${data[i].price}$
//             </div>
//         </div>
// <!--        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">-->
// <!--            <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>-->
// <!--        </div>-->
//     </div>
// </div>
//                 `);
//                 $("#myCatalog").append($(row).html());
//             }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             alert('Error: ' + textStatus + ' - ' + errorThrown);
//         }
//     });
// </script> */}
// </div>
// </div>
//     );
//   }
// }

// export default Catalog;
