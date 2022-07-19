const UserService = require("../Services/UserService");
const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = class User {
  static async auth(req, res, next) {
    console.log("inside auth function");
    let exist = await UserService.FIND(req.body.email, req.body.password);
    console.log("/auth" + exist);
    if (exist != 0) {
      passport.authenticate("local", function (err, user, info) {
        if (err || !user) {
          console.log("Error", info);
          return res.status(400).send(info);
        }

        req.logIn(user, function (err) {
          if (err) {
            return next(err);
            // return res.status(404).send("Username or password incorrect");
          }
        });
        return res.sendStatus(200);
      })(req, res, next);
    } else {
      return res.sendStatus(404);
    }
  }

  static async getCurrentUser(req, res, next) {
    return res.json(req.user);
  }

  static async logout(req, res, next) {
    console.log("logout");
    req.logout();
    return res.sendStatus(200);
  }
}
