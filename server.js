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
const session = require('express-session');
app.use(session(
    { secret: 'secret', 
    algorithms: ['RS256'], 
    cookie: { maxAge: 360000 }, 
    resave: false, 
    saveUninitialized: false }));
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

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);});

indexRouter = require("./src/Routes/indexRouter");
app.use("/", indexRouter);

