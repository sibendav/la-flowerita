import "../css/chat.css";
import io from "socket.io-client";
import React,{ useState } from "react";
import Chat from "./Chat";
import Conversation from "./Conversation";
import ScrollToBottom from "react-scroll-to-bottom";


const socket = io.connect("http://localhost:5000");


function PreChat(props) {
    const username = props.userName; //*initialize
    const [room, setRoom] = useState("");
    const [newroom, setNewroom] = useState("");
    const [rooms, setRooms] = useState([]); //*initialize
    const [showChat, setShowChat] = useState(false);

    React.useEffect(function effectFunction() {
        var options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/getRoomsNames", options)
            .then(response => response.json())
            .then((res) => {
                setRooms(res.roomNames);
            });
    }, []);
    const joinRoom = (r) => {
        if (username !== "" && r !== "") {
            console.log(r);
            socket.emit("join_room", r);
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
                        <button
                        className="button-la-flowerita"
                         onClick={() => {
                            if (newroom!="") {
                                var options = {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body:JSON.stringify({room: newroom})
                                };
                                fetch("/addNewRoom", options)
                                    .then((res) => {
                                        if(res.status != 200){
                                            console.log("error in adding new room");
                                        }
                                    });
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
                                joinRoom(c)}}>
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
                            <Chat key={room} socket={socket} username={username} room={room} />
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