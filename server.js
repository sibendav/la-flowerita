const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

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
const port = 3001;
server.listen(port, () => {
    console.log('Server Running on port ${port}!');
});


const path = require("path");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var mongoose = require("mongoose");

require("./src/Models/users");
require("./src/Models/products");
require("./src/Models/orderProducts");
require("./src/Models/shoppinglists");
require("./src/Models/userShoppinglists");
require("./src/Config/passport");

// AUTHENTIATION
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const dbConfig = require("./src/Config/db");


app.use(session(
    { secret: 'secret',
    algorithms: ['RS256'],
    cookie: { maxAge: 15 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
     }));

app.use(passport.initialize())
app.use(passport.session());
app.use(express.static(path.join(__dirname, "/public")));


indexRouter = require("./src/Routes/indexRouter");
app.use("/", indexRouter);

// connect to database
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



