const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var mongoose = require("mongoose");
require("./src/Models/users");

const uri = "mongodb://tratzon:tratzon1@cluster0-shard-00-00.l39y0.mongodb.net:27017,cluster0-shard-00-01.l39y0.mongodb.net:27017,Users-shard-00-02.l39y0.mongodb.net:27017/FlowersShop?ssl=true&replicaSet=atlas-2i336t-shard-0&authSource=admin&retryWrites=true&w=majority";
// mongoose.connect(uri, 
//     { useNewUrlParser: true, useUnifiedTopology: true
//     },  () => {
//         console.log('Connected to MongoDB');
//       });

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
    // perform a database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`app listening on port ${port}!`);});

const User = mongoose.model('Users');


// app.get("/express_backend", (req, res) => {
//   //Line 9
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
// });

app.post("/auth", jsonParser, async function (req, res) {
    let exist = await User.FIND(req.body.username,req.body.password);
    console.log("/auth"+exist);
    if (exist != 0) {
        return res.sendStatus(200);
    }
    return res.sendStatus(404);
});
