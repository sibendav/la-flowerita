import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

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
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div id={messageContent.time}
                                className="message"
                                name={username === messageContent.author ? "you" : "other"}
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
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
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


// import { ChatEngine } from 'react-chat-engine';
//
// var projectID = "cb170dd9-a25e-43b8-9abf-0f029abae94c"
// var username = "simha"
// var password = "12345"
// const Chat = () => {
//         return (
//         <ChatEngine
//             height="100"
//             projectID={projectID}
//             userName={username}
//             userSecret={password}
//         />
//     );
// };
// export default Chat;


// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import '../css/chat.css';
// import 'bootstrap/dist/css/bootstrap.css';
// //import { Glyphicon } from 'react-bootstrap';
// import socketIOClient from "socket.io-client";
//
// class Chat extends Component {
//     // constructor({match}) {
//     //     super();
//     //     this.userName = match.params;
//     //     this.state = {
//     //         endpoint: "localhost:4001",
//     //         message:'',
//     //         name:'',
//     //         allMessages:[]
//     //     };
//     //
//     //
//     //
//     //     this.updateMessage = this.updateMessage.bind(this);
//     //
//     // }
//     //
//     // componentDidMount = () => {
//     //     document.body.classList.toggle('chat');
//     //
//     //     this.setState({name: this.getShortName(this.userName.name)});
//     //     const socket = socketIOClient(this.state.endpoint);
//     //
//     //     socket.on('message', (message) => {
//     //         if(message.name !== this.state.name)
//     //         {
//     //             let arr = this.state.allMessages;
//     //             arr.push(message);
//     //             this.setState({allMessages: arr});
//     //         }
//     //     })
//     //
//     // }
//     // componentWillUnmount() {
//     //     document.body.classList.remove('chat')
//     // }
//     //
//     //
//     // updateMessage(e) {
//     //     this.setState({message: e.target.value});
//     // }
//
//     render() {
//         // const socket = socketIOClient(this.state.endpoint);
//         return (
//             <div className="container-fluid h-100">
//                 <div className="row justify-content-center h-100">
//
//                     <div className="col-md-8 col-xl-6 chat">
//                         <div className="card">
//                             <div className="card-header msg_head">
//                                 <div className="d-flex bd-highlight">
//                                     <div className="img_cont">
//                                         {/*<div className="rounded-circle user_img userNameCard">{this.state.name}</div>*/}
//                                         <div className="rounded-circle user_img userNameCard">S</div>
//                                         <span className="online_icon"></span>
//                                     </div>
//                                     <div className="user_info">
//                                         <span>Chat</span>
//                                         {/*<p>{this.state.allMessages.length} Messages</p>*/}
//
//                                     </div>
//
//                                 </div>
//
//                             </div>
//                             <div className="card-body msg_card_body">
//
//                                 {/*{this.renederMessages()}*/}
//
//                             </div>
//                             <div className="card-footer">
//                                 {/*<div className="input-group">*/}
//
// 								{/*<textarea name="" className="roundCorner form-control type_msg " placeholder="Type your message..."  value = {this.state.message}*/}
//                                 {/*          onChange = {this.updateMessage}></textarea>*/}
//                                 {/*    <div className="input-group-append">*/}
// 								{/*	<span onClick={this.send}className="input-group-text send_btn costumSendBtn"><i*/}
//                                 {/*        className="fa fa-paper-plane" ></i></span>*/}
//                                 {/*    </div>*/}
//                                 {/*</div>*/}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//         );
//
//
//     }
//     // send = ()=>
//     // {
//     //     let newMessage={
//     //         type:'send',
//     //         content:this.state.message,
//     //         name:this.state.name,
//     //         time: this.getTime()
//     //     }
//     //     let arr = this.state.allMessages;
//     //     arr.push(newMessage);
//     //     this.setState({allMessages: arr});
//     //     this.setState({message: ''});
//     //
//     //     let sendMessage = {...newMessage};
//     //     sendMessage.type = "recieve";
//     //     const socket = socketIOClient(this.state.endpoint);
//     //     socket.emit('message', sendMessage)
//     //
//     // }
//     // getTime(){
//     //     let date = new Date();
//     //     return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
//     // }
//     //
//     // getShortName(name){
//     //     let short = '';
//     //     let arr = name.split(" ")
//     //     arr.forEach(function(name) {
//     //         short+=name.charAt(0);
//     //     });
//     //     return short.toUpperCase();
//     //
//     // }
//     //
//     // renederMessages(){
//     //     return this.state.allMessages.map(message=>this.getMessage(message));
//     // }
//     //
//     // getMessage(message){
//     //     if(message.type == 'send'){
//     //
//     //         return <div key={message.time} className="d-flex justify-content-end mb-4">
//     //             <div className="msg_cotainer_send">
//     //
//     //                 {message.content}
//     //                 <span className="msg_time_send">{message.time}</span>
//     //             </div>
//     //             <div className="img_cont_msg">
//     //                 <div className="rounded-circle user_img_msg littleCircle">{this.state.name}</div>
//     //             </div>
//     //         </div>;
//     //     }
//     //
//     //     if(message.type == 'recieve'){
//     //
//     //         return <div key={message.time} className="d-flex justify-content-start mb-4">
//     //             <div className="img_cont_msg">
//     //                 <div className="rounded-circle user_img_msg littleCircleStart">{message.name}</div>
//     //             </div>
//     //             <div className="msg_cotainer">
//     //                 {message.content}
//     //                 <span className="msg_time">{message.time}</span>
//     //             </div>
//     //         </div>;
//     //     }
//
//
//
//
//     // }
// }
//
// export default Chat;