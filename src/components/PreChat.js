import "../css/chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Conversation from "./conversation";
import ScrollToBottom from "react-scroll-to-bottom";


const socket = io.connect("http://localhost:5000");


function PreChat(userName) {
    const username = "simha"; //*initialize
    const [room, setRoom] = useState("");
    const [newroom, setNewroom] = useState("");
    const [rooms, setRooms] = useState(["friends", "Collis", "Family"]); //*initialize
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="joinChatContainer">
                        <input
                            type="text"
                            placeholder="New Group"
                            value={newroom}
                            onChange={(event) => {
                                setNewroom(event.target.value);
                            }}
                        />
                        <button onClick={() => {
                            if (newroom!="") {
                            setRooms((prev) => [...prev, newroom]);
                            setRoom(newroom);
                            joinRoom();
                            setNewroom("");
                            }
                        }}>Join A Room</button>
                        </div>
                        <ScrollToBottom>
                        {rooms.map((c) => (
                            <div onClick={() => {
                                setRoom(c);
                                joinRoom()}}>
                                <Conversation roomName={c} />
                        </div>
                        ))}
                        </ScrollToBottom>
                    </div>                    
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {room ? (
                            <>
                            <Chat socket={socket} username={username} room={room} />
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

export default PreChat;