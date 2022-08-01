const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserService = require("../Services/UserService");
const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { status:  404  });
      }
      user = {_id: user._id, email:user.email};
      console.log("logged " + JSON.stringify(user));
      return done(null, user);
    }).catch(done);
}));


passport.serializeUser( (userObj, done) => {
  console.log("serializeUser")
  done(null, userObj)
})

passport.deserializeUser((userObj, done) => {
  console.log("derializeUser")
  done (null, userObj )
})

