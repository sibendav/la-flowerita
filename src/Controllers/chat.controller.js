const mongoose = require('mongoose');
const Rooms = mongoose.model('Rooms');

module.exports = class Chat {
    static async getMessagesOfRoom(req,res,next){
        var room = req.body.room;
        if(req.user){
            var messages = await Rooms.findOne({roomName: room});
            console.log("getMessagesOfRoom "+ messages);
            if(messages.messageList){
            return res.json({status:200, messageList: messages.messageList});
            } else{
                return res.json({status:200, messageList: []}); 
            }
        } else{
            return res.json({status: 403, messageList:[]});
        }
    }

    static async addNewMessage(req,res,next){
        var room = req.body.room;
        var data = req.body.data;
        console.log(req.body);
        if(req.user){
            var currentRoom = await Rooms.findOne({roomName: room});
            currentRoom.messageList.push(data);
            await Rooms.updateOne(
                { roomName:room },
                { $set: { messageList: currentRoom.messageList} }
              );
            // currentRoom.map(r => r.roomName == room ? r.messageList =  currentRoom.messageList: r.messageList = r.messageList);
            
            return res.sendStatus(200);
        } else{
            return res.sendStatus(403);
        }
    }

    static async addNewRoom(req,res,next){
        var newRoom = {roomName:req.body.room, messageList:[]};
        if(req.user){
            var room = await Rooms(newRoom);
            await room.save();
            return res.json({status:200});
        } else{
            return res.json({status: 403});
        }
    }
    static async getRoomNames(req,res,next){
        if(req.user){
            var rooms = await Rooms.find({});
            console.log(rooms);
            var roomNames = rooms.map(r => r.roomName);
            console.log(roomNames);

            return res.json({status:200, roomNames: roomNames});
        } else{
            return res.json({status: 403, rooms:[]});
        }
    }
}