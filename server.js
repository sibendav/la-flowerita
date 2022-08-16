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
require("./src/Models/orders");

const dbConfig = require("./src/Config/db");

// AUTHENTIATION
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const session = expressSession(
    { secret: 'secret', 
    algorithms: ['RS256'], 
    cookie: { maxAge: 60 * 15 * 1000 }, 
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


app.use(express.static(path.join(__dirname, "/public")));

indexRouter = require("./src/Routes/indexRouter");
app.use("/", indexRouter);


// Connection to the socket
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
  },
});



io.on('connection', function(socket) {
  console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server Running on port ${port}!`);
});