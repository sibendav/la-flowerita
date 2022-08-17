import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/users.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit,AiFillDelete,FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import UpdateUserModal from "./UpdateUserModal.js";
import swal from "sweetalert";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      name: props.name,
      phone: props.phone,
      degree: props.degree,
      address: props.address,
      email: props.email,
      isApproved: props.isApproved,
      profileImage: props.profileImage,
    };
    console.log(props);
  }
  
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    var path = "";
    if(this.props.profileImage)
    {path = "data:/" +
      this.props.profileImage.contentType+
      ";base64," + this.arrayBufferToBase64(this.props.profileImage.data);}
    var currentUser = this.props.user;
    return (
              <tr class="candidates-list" key={currentUser._id}>
                 <td class="title">
                    <div class="thumb">
                      <img class="img-fluid"  src={path} alt="" onError={(e) => {
              e.target.src =
                "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
              e.target.onerror = null; // prevents looping
            }}/>
                    </div>
                 
                    <div class="candidate-list-details">
                      <div class="candidate-list-info">
                        <div class="candidate-list-title">
                          <h5 class="mb-0"><a>{this.props.name}</a></h5>
                        </div>
                        <div class="candidate-list-option">
                        
                          <ul class="list-unstyled">
                            <li><i class="fas fa-phone pr-1"></i>{this.props.phone}</li>
                            <li><i class="fas fa-map-marker-alt pr-1"></i>{this.props.address}</li>
                            <li><i class="fas fa-envelope pr-1"></i>{this.props.email}</li>
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                    </td>
                    <td class="candidate-list-favourite-time text-center">
                        <h5 class="mb-0"><a>{this.props.degree}</a></h5>
                    </td>
                    <td class="candidate-list-favourite-time text-center">
                    <ul class="list-unstyled mb-0 d-flex justify-content-end">
                    <UpdateUserModal
                            _id={this.props._id}
                            name={this.props.name}
                            phone={this.props.phone}
                            degree={this.props.degree}
                            address={this.props.address}
                            isApproved = {this.props.isApproved}
                            email={this.props.email}
                            path = {path}
                          />
                    </ul>
                      </td>
                </tr>  
    //   <div  className="row product">
    //   <div className="col-md-2">
    //    <div>
    //       <h5>{this.props.degree}</h5>
    //     </div>
    //     <div>
    //     <h4>{this.props.name}</h4>
    //     <div>
    //       <h5>{this.props.address}</h5>
    //     </div>
    //     <div>
    //       <h5>{this.props.phone}</h5>
    //     </div>
    //     <div>
    //       <h5>{this.props.email}</h5>
    //     </div>
    //   </div>
    //   </div>
    //   <div className="col-md-1 product-price">
    //     <UpdateUserModal
    //       id={this.props.id}
    //       name={this.props.name}
    //       phone={this.props.phone}
    //       degree={this.props.degree}
    //       address={this.props.address}
    //       email={this.props.email}
    //      // path = {path}
          
    //     />
    //   </div>
      
    // </div>
    
    );
  }
}

export default User;
