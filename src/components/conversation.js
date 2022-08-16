import axios from "axios";
import "../css/chat.css";

export default function Conversation({ roomName }) {
  const user = "";
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="conversation">
    <img
      className="conversationImg"
      src={
        user?.profilePicture
          ? PF + user.profilePicture
          : PF + "../../../public/images/icon1.jpg"
      }
      alt=""
    />
    <span className="conversationName">{roomName}</span>
  </div>
  );
}
