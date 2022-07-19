const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/user.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/auth", jsonParser, UserCtrl.auth);
router.get("/getCurrentUser", jsonParser, UserCtrl.getCurrentUser);
router.get("/logout", jsonParser, UserCtrl.logout);

module.exports =  router;