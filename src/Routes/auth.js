const jwt = require('express-jwt');


const checkAuthenticated = (req, res, next) => {
  console.log("checkAuthenticated");
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

const checkLoggedIn = (req, res, next) => {
  console.log("checkLoggedIn");
  if (req.isAuthenticated()) { 
       return res.redirect("/Dashboard")
   }
  next()
}

module.exports = {
  checkAuthenticated: checkAuthenticated,
  checkLoggedIn:checkLoggedIn
};
