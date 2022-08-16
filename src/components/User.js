import { React, Component } from "react";
import sampleImage from "../logo.svg";
import "../css/catalog.css";
import "../css/users.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit,AiFillDelete,FaHeart, FaRegHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import UpdateUserModal from "./UpdateUserModal.js";
import swal from "sweetalert";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      phone: props.phone,
      degree: props.degree,
      address: props.address,
      email: props.email,
      profileImage: props.profileImage,
    };
  }
  
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    //var path = "data:/" +
      //this.props.profileImage.contentType+
      //";base64," + this.arrayBufferToBase64(this.props.profileImage.data);
    var currentUser = this.props.user;
    return (
      <div>
              <tr key={currentUser.id}>
                 <td class="title">
                    <div class="thumb">
                      <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""></img>
                    </div>
                 
                    <div class="candidate-list-details">
                      <div class="candidate-list-info">
                        <div class="candidate-list-title">
                          <h5 class="mb-0"><a>{this.props.name}</a></h5>
                        </div>
                        <div class="candidate-list-title">
                          <h5 class="mb-0"><a>{this.props.degree}</a></h5>
                        </div>
                        <div class="candidate-list-option">
                        
                          <ul class="list-unstyled">
                            <li><i class="fas fa-phone pr-1"></i>{this.props.phone}</li>
                            <li><i class="fas fa-map-marker-alt pr-1"></i>{this.props.address}</li>
                            <li><i class="fas fa-envelope pr-1"></i>{this.props.email}</li>
                          </ul>
                        </div>
                        <div className="col-md-1 product-price">
                          <UpdateUserModal
                            id={this.props.id}
                            name={this.props.name}
                            phone={this.props.phone}
                            degree={this.props.degree}
                            address={this.props.address}
                            email={this.props.email}
                          // path = {path}
                          />
                        </div>
                      </div>
                    </div>
                    </td>
                </tr>  
            </div>
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
