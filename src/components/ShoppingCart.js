import {React, Component} from 'react';
import sampleImage from '../logo.svg';
import '../css/shoppingCart.css';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import OrderedProduct from "./OrderedProduct.js"
import swal from "sweetalert";
import { Container, Table, Row, Button } from "react-bootstrap";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      totalPrice: 0,
      products: [],
      deleted: [],
      loggedIn: false,
      onUpdateCart: props.onUpdateCart,
    };
  }
  componentDidMount = async () => {
    var options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/getCurrentCart", options).then(res => res.json()).then(
      (result) => {
        console.log(result)
        if (result.status == 200) {
          this.setState({
            id: result.cart._id,
            products: result.cart.products,
            totalPrice: result.cart.products.reduce(
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

  // async cartForLoggedUser(){
  //   console.log("logged in");
  //   var products = [];
  //   var options = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   await fetch("/getCurrentCart", options).then(res => res.json()).then(
  //     (result) => {
  //       console.log(result)
  //       if (result.status == 200) {
  //         this.setState({
  //           id: result.cart._id,
  //           products: result.cart.products,
  //           totalPrice: result.cart.products.reduce(
  //             (acc, item) => acc + item.price * item.quantity,
  //             0
  //           ),
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // }
  // async cartForNoUser() {
  //   console.log("no user");
  //   var products = JSON.stringify([]);
  //   if (sessionStorage.getItem("cart")) {
  //     var cart = JSON.parse(sessionStorage.getItem("cart"));
  //     console.log(cart);
  //     if (cart) {
  //       products = cart.products;
  //     }
  //     sessionStorage.setItem("cart", JSON.stringify({ products: products }));
  //     this.setState({
  //       products: products,
  //       totalPrice: products.reduce(
  //         (acc, item) => acc + item.price * item.quantity,
  //         0
  //       ),
  //     });
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.products.length != prevState.products.length) {
      this.state.onUpdateCart(this.state.products.length);
    }
  }

  async intoWishList() {}
  async deleteFromCart(id) {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this product from cart?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({productId: id})
        };
        fetch("/deleteProductFromCart", options).then(res => res.json()).then(
          (result) => {
            console.log(result)
            if (result.status == 200) {
              this.setState({
                products: result.cart.products,
                totalPrice: result.cart.products.reduce(
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
      //   var isLogged = await isLogged();
      //   if (isLogged){
      //     var options = {
      //       method: "GET",
      //       headers: { "Content-Type": "application/json" },
      //     };
      //     await fetch("/isLogged", options).then(
      //       (result) => {
      //         console.log("hiiiii");
      //         if (result.status == 200) {
      //           return true;
      //         } else {
      //           return false;
      //         }
      //       },
      //       (error) => {
      //         console.log(error);
      //         return false;
      //       }
      //     );
      //   } else {
      //   var cart = JSON.parse(sessionStorage.getItem("cart"));
      //   console.log(id);
      //   cart.products = cart.products.filter((p) => p.id != id);
      //   sessionStorage.setItem("cart", JSON.stringify(cart));
      //   this.setState({
      //     products: cart.products,
      //     totalPrice: cart.products.reduce(
      //       (acc, item) => acc + item.price * item.quantity,
      //       0
      //     ),
      //   });
      // }
      })
    }

  async updateQuantity(e, id) {
    var quantity = Number(e.target.value);
    var product = this.state.products.filter(p => p.id == id);
    product = product[0]    
    product.quantity = quantity;
    var products = this.state.products;
    products.map((p) => {if(p.id == id) p = product})
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({product:{productId: product.id, price: product.price, quantity: product.quantity}})
    };
    await fetch("/updateProductInCart", options).then(res => res.json()).then(
      (result) => {
        console.log(result)
        if (result.status == 200) {
          this.setState({
            products: result.cart.products,
            totalPrice: result.cart.products.reduce(
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
  //   var cart = JSON.parse(sessionStorage.getItem("cart"));
  //   cart.products.map((p) => {
  //     if (p.id == id) p.quantity = quantity;
  //   });
  //   sessionStorage.setItem("cart", JSON.stringify(cart));
  //   console.log(cart);
  //   this.setState({
  //     products: cart.products,
  //     totalPrice: cart.products.reduce(
  //       (acc, item) => acc + item.price * item.quantity,
  //       0
  //     ),
  //   });
  // }
  render() {
    return (
      <div className="productSlider mb-5 mt-5">
        <Container>
          <h5 className="text-left mb-4 ps-2">Cart List</h5>
          <Row>
            <div className="col-9 cartShow">
              <Table bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Product Img</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((product, idx) => (
                    <OrderedProduct
                      key={product.id}
                      isCart={true}
                      product={product}
                      onDelete={(id) => this.deleteFromCart(id)}
                      onUpdate={(e, id) => this.updateQuantity(e, id)}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-3 cartSum boxShadaw bg-light p-4">
              <h5 className="text-left mb-4 pb-2">Cart Price</h5>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-normal">Tax :</h6>
                <span>{(this.state.totalPrice * (17 / 117)).toFixed(2)}$</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <h6 className="fw-normal">SubTotal Price :</h6>
                <span>{(this.state.totalPrice * (100 / 117)).toFixed(2)}$</span>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <h6>Total Price :</h6>
                <span>{this.state.totalPrice}$</span>
              </div>
              <Button variant="dark" size="md" className="mt-4 w-100">
                pay now
              </Button>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;