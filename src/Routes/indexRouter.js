const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/user.controller");
const CatalogCtrl = require("../Controllers/catalog.controller");
const ShoppinglistCtrl = require("../Controllers/shoppinglist.controller");
const OrderCtrl = require("../Controllers/order.controller");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const auth = require('./auth');


router.post("/auth", jsonParser, UserCtrl.auth);
router.get("/getCurrentUser", jsonParser, UserCtrl.getCurrentUser);
router.get("/logout", jsonParser, UserCtrl.logout);
router.post("/emailForResetPassword", jsonParser, UserCtrl.emailForResetPassword);
router.post("/checkToken", jsonParser, UserCtrl.checkToken);
router.post("/updatePassword", jsonParser, UserCtrl.updatePassword);
router.post("/signup", jsonParser, UserCtrl.signup);
router.get("/getProfileImage", jsonParser, UserCtrl.getProfileImage);
router.post("/addUserProfile", jsonParser, UserCtrl.addUserProfile);

router.post("/getUsers", jsonParser, UserCtrl.getUsers);
router.post("/addNewUser", jsonParser, UserCtrl.addNewUser);
router.post("/updateUser", jsonParser, UserCtrl.updateUser);
router.post("/deleteUser", jsonParser, UserCtrl.deleteUser);

router.post("/getCatalog", jsonParser, CatalogCtrl.getCatalog);
router.post("/addNewProduct", jsonParser, CatalogCtrl.addNewProduct);
router.post("/addProductPicture", jsonParser, CatalogCtrl.addProductPicture);
router.post("/updateProduct", jsonParser, CatalogCtrl.updateProduct);
router.post("/deleteProduct", jsonParser, CatalogCtrl.deleteProduct);
router.post("/addProductToCart", jsonParser, ShoppinglistCtrl.addProduct);

router.post("/getOrders", jsonParser, OrderCtrl.getOrders);
router.post("/getClientOrders", jsonParser, OrderCtrl.getClientOrders);
router.post("/addNewOrder", jsonParser, OrderCtrl.addNewOrder);
router.post("/updateOrder", jsonParser, OrderCtrl.updateOrder);
router.post("/updateOrderStatus", jsonParser, OrderCtrl.updateOrderStatus);


module.exports =  router;