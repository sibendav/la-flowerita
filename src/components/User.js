import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit,AiFillDelete,FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import UpdateUserModal from "./UpdateUserModal.js";
import swal from "sweetalert";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      phone: props.phone,
      degree: props.degree,
      address: props.address,
      isActivate: props.isActivate,
      email: props.email,
    };
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
          <div>
            <h5>{this.props.degree}</h5>
          </div>
        </div>
        <div className="col-md-2 product-detail">
          <h4>{this.props.name}</h4>
          <div>
            <h5>{this.props.address}</h5>
          </div>
          <div>
            <h5>{this.props.phone}</h5>
          </div>
          <div>
            <h5>{this.props.email}</h5>
          </div>
        </div>
        <div className="col-md-1 product-price">
          <UpdateUserModal
            id={this.props.id}
            name={this.props.name}
            path={path}
            phone={this.props.phone}
            degree={this.props.degree}
            address={this.props.address}
            email={this.props.email}
            
          />
        </div>
      </div>
    );
  }
}

export default User;
