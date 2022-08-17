const mongo = require("mongoose");
const { Schema } = mongo;

const RoomSchema = new Schema({
      roomName: String, 
      messageList:Array
    }, { autoIndex: true });
    mongo.model('Rooms', RoomSchema, 'Rooms'); // if model name as lowercase with suffix "s" === collection name: User => users
