// import "./messenger.css";
import io from "socket.io-client";
import Chat from "./Chat";
import Conversation from "./conversation";



export default function Messenger(user) {
    const socket = io.connect("http://localhost:5000");
    // const [conversations, setConversations] = useState([]);
    const conversations = ["1", "2", "3"];
    const currentChat="";
    const setCurrentChat = (c) => {
        currentChat=c;
    };
    return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <Chat socket={socket} username={user} room={currentChat}/>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}
