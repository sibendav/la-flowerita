import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/shoppingCart.css";
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import OrderedProduct from "./OrderedProduct.js";
import swal from "sweetalert";
import { Container, Table, Row, Button } from "react-bootstrap";
import LoadingIndicator from "./Spinner";
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      totalPrice: 0,
      products: [],
      deleted: [],
      loggedIn: false,
      onUpdateWishlist: props.onUpdateWishlist,
      onUpdateCart: props.onUpdateCart
    };
  }
  componentDidMount = async () => {
    var options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    trackPromise(
    fetch("/getCurrentWishlist", options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) {
            this.setState({
              id: result.wishlist._id,
              products: result.wishlist.products,
              totalPrice: result.wishlist.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            });
          }
        },
        (error) => {
          console.log(error);
        }
      ));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.products.length != prevState.products.length) {
      this.state.onUpdateWishlist(this.state.products.length);
    }
  }

  async intoWishList() {}
  async deleteFromWishlist(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this product from wishlist?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        };
        trackPromise(
        fetch("/deleteProductFromWishlist", options)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              if (result.status == 200) {
                this.setState({
                  products: result.wishlist.products,
                  totalPrice: result.wishlist.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ),
                });
                swal("Success","Product Deleted Successfully From Wish List", "success")
              }
            },
            (error) => {
              console.log(error);
            }
          ));
      }
    });
  }

  async updateQuantity(e, id) {
    var quantity = Number(e.target.value);
    var product = this.state.products.filter((p) => p.id == id);
    product = product[0];
    product.quantity = quantity;
    var products = this.state.products;
    products.map((p) => {
      if (p.id == id) p = product;
    });
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: {
          productId: product.id,
          price: product.price,
          quantity: product.quantity,
        },
      }),
    };
    await fetch("/updateProductInWishlist", options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) {
            this.setState({
              products: result.wishlist.products,
              totalPrice: result.wishlist.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async addToCart(id) {
      var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      };
      fetch("/addNewProductToCart", options).then(res => res.json()).then(
        (result) => {
          if (result.status == 200) {
            this.state.onUpdateCart(result.cart.products.length);
            swal("Success","Product Added Successfully To Cart", "success")
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <div className="productSlider mb-5 mt-5">
        <Container>
          <h5 className="text-left mb-4 ps-2">Wish List</h5>
          <Row>
            <div className="col-9 wishlistShow">
              <Table bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Product Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Add To Cart</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <LoadingIndicator />
                  {this.state.products.map((product, idx) => (
                    <OrderedProduct
                      key={product.id}
                      isCart={false}
                      product={product}
                      onDelete={(id) => this.deleteFromWishlist(id)}
                      onUpdate={(e, id) => this.updateQuantity(e, id)}
                      onAdd={(e, id) => this.addToCart(e, id)}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Wishlist;
