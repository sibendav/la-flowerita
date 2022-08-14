const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/user.controller");
const CatalogCtrl = require("../Controllers/catalog.controller");
const ShoppinglistCtrl = require("../Controllers/shoppinglist.controller");

const OrderCtrl = require("../Controllers/order.controller");

const WishlistCtrl = require("../Controllers/wishlist.controller");


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


router.post("/getOrders", jsonParser, OrderCtrl.getOrders);
router.post("/getClientOrders", jsonParser, OrderCtrl.getClientOrders);
router.post("/addNewOrder", jsonParser, OrderCtrl.addNewOrder);
router.post("/updateOrder", jsonParser, OrderCtrl.updateOrder);
router.post("/updateOrderStatus", jsonParser, OrderCtrl.updateOrderStatus);

// router.post("addProductToCart", jsonParser, ShoppinglistCtrl.addProduct);
router.get("/getCurrentCart", jsonParser, ShoppinglistCtrl.getCurrentCart);
router.get("/getCurrentWishlist", jsonParser, WishlistCtrl.getCurrentWishlist);
router.get("/isLogged", jsonParser, UserCtrl.isLogged);
router.post("/addNewProductToCart", jsonParser, ShoppinglistCtrl.addNewProductToCart);
router.post("/updateProductInCart", jsonParser, ShoppinglistCtrl.updateProductInCart);
router.post("/deleteProductFromCart", jsonParser, ShoppinglistCtrl.deleteProductFromCart);
router.post("/addNewProductToWishlist", jsonParser, WishlistCtrl.addNewProductToWishlist);
router.post("/updateProductInWishlist", jsonParser, WishlistCtrl.updateProductInWishlist);
router.post("/deleteProductFromWishlist", jsonParser, WishlistCtrl.deleteProductFromWishlist);
router.get("/getSession", jsonParser, UserCtrl.getSession);
router.get("/payNow",jsonParser, ShoppinglistCtrl.payNow)



module.exports =  router;