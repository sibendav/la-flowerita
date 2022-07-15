const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var mongoose = require("mongoose");
require("./src/Models/users");

const uri = "mongodb+srv://tratzon:tratzon1@cluster0.l39y0.mongodb.net/FlowersShop?retryWrites=true&w=majority";
mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true
    },  () => {
        console.log('Connected to MongoDB');
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
