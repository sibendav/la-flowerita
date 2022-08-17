import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    // const [newChat, setnewChat] = useState(true);
    // alert(newChat);

    React.useEffect(function effectFunction() {
        var options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({room: room})
        };
        fetch("/getMessagesOfRoom", options)
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                setMessageList(res.messageList);
            });
    }, []);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            // setnewChat(false);
            setCurrentMessage("");
            var options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({room: room, data: messageData})
            };
            await fetch("/addNewMessage", options)
                .then((res) => {
                    if(res.status != 200){
                        console.log("error in saving message in mongo db")
                    }
                });
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            // setnewChat(false);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>{room}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList && messageList != [] ? messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }):<span className="noConversationText">
                    No Messages Here Yet...
                   </span>}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="type something..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;