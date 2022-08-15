const  express =  require("express");
const router = express.Router();
const UserCtrl = require("../Controllers/user.controller");
const CatalogCtrl = require("../Controllers/catalog.controller");
const ShoppinglistCtrl = require("../Controllers/shoppinglist.controller");
const WishlistCtrl = require("../Controllers/wishlist.controller");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const auth = require('./auth');

router.post("/api/auth", jsonParser, UserCtrl.auth);
router.get("/api/getCurrentUser", jsonParser, UserCtrl.getCurrentUser);
router.get("/api/logout", jsonParser, UserCtrl.logout);
router.post("/api/emailForResetPassword", jsonParser, UserCtrl.emailForResetPassword);
router.post("/api/checkToken", jsonParser, UserCtrl.checkToken);
router.post("/api/updatePassword", jsonParser, UserCtrl.updatePassword);
router.post("/api/signup", jsonParser, UserCtrl.signup);
router.get("/api/getProfileImage", jsonParser, UserCtrl.getProfileImage);
router.post("/api/addUserProfile", jsonParser, UserCtrl.addUserProfile);
router.post("/api/getCatalog", jsonParser, CatalogCtrl.getCatalog);
router.post("/api/addNewProduct", jsonParser, CatalogCtrl.addNewProduct);
router.post("/api/addProductPicture", jsonParser, CatalogCtrl.addProductPicture);
router.post("/api/updateProduct", jsonParser, CatalogCtrl.updateProduct);
router.post("/api/deleteProduct", jsonParser, CatalogCtrl.deleteProduct);
// router.post("addProductToCart", jsonParser, ShoppinglistCtrl.addProduct);
router.get("/api/getCurrentCart", jsonParser, ShoppinglistCtrl.getCurrentCart);
router.get("/api/getCurrentWishlist", jsonParser, WishlistCtrl.getCurrentWishlist);
router.get("/api/isLogged", jsonParser, UserCtrl.isLogged);
router.post("/api/addNewProductToCart", jsonParser, ShoppinglistCtrl.addNewProductToCart);
router.post("/api/updateProductInCart", jsonParser, ShoppinglistCtrl.updateProductInCart);
router.post("/api/deleteProductFromCart", jsonParser, ShoppinglistCtrl.deleteProductFromCart);
router.post("/api/addNewProductToWishlist", jsonParser, WishlistCtrl.addNewProductToWishlist);
router.post("/api/updateProductInWishlist", jsonParser, WishlistCtrl.updateProductInWishlist);
router.post("/api/deleteProductFromWishlist", jsonParser, WishlistCtrl.deleteProductFromWishlist);
router.get("/api/getSession", jsonParser, UserCtrl.getSession);
router.get("/api/payNow",jsonParser, ShoppinglistCtrl.payNow)


module.exports =  router;