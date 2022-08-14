const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var mongoose = require("mongoose");
require("./src/Models/users");
require("./src/Models/products");
require("./src/Models/orderProducts");
require("./src/Models/shoppinglists");
require("./src/Models/userShoppinglists");

const dbConfig = require("./src/Config/db");

// AUTHENTIATION
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const session = expressSession(
    { secret: 'secret', 
    algorithms: ['RS256'], 
    cookie: { maxAge: 60 * 60 * 24 * 1000 }, 
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/FlowersShop', //YOUR MONGODB URL
        ttl: 15 * 60 * 1000 ,
        autoRemove: 'native' 
    })
     })
app.use(session);
const passport = require('passport');
const LocalStrategy = require('passport-local')
app.use(passport.initialize())
app.use(passport.session());
require("./src/Config/passport");

// const uri = "mongodb://tratzon:tratzon1@cluster0-shard-00-00.l39y0.mongodb.net:27017,cluster0-shard-00-01.l39y0.mongodb.net:27017,Users-shard-00-02.l39y0.mongodb.net:27017/FlowersShop?ssl=true&replicaSet=atlas-2i336t-shard-0&authSource=admin&retryWrites=true&w=majority";
const uri = dbConfig.url;
mongoose.connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`,
        );
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

const port = 5000;
app.use(express.static(path.join(__dirname, "/public")));

const server = app.listen(port, () => {
    console.log(`app listening on port ${port}!`);});

indexRouter = require("./src/Routes/indexRouter");
app.use("/", indexRouter);


var io = require("socket.io")(server)
io.use(function(socket, next){
        // Wrap the express middleware
        session(socket.request, {}, next);
    })
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});