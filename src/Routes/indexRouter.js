const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/user.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/auth", jsonParser, UserCtrl.auth);
router.get("/getCurrentUser", jsonParser, UserCtrl.getCurrentUser);
router.get("/logout", jsonParser, UserCtrl.logout);
router.post("/emailForResetPassword", jsonParser, UserCtrl.emailForResetPassword);
router.post("/checkToken", jsonParser, UserCtrl.checkToken);
router.post("/updatePassword", jsonParser, UserCtrl.updatePassword);
router.post("/signup", jsonParser, UserCtrl.signup);
module.exports =  router;