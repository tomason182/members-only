const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("../models/user");
const crypto = require("node:crypto");

/// PASSPORT CONFIG ///

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      return cb(null, false, { message: "Incorrect username or password" });
    }

    crypto.pbkdf2(
      password,
      user.salt,
      100000,
      64,
      "sha512",
      (err, hashedPassword) => {
        if (err) {
          return cd(err);
        }
        const buf = Buffer.from(user.hashed_password, "hex");
        console.log("db password", buf);
        console.log("enter psw", hashedPassword);
        if (!crypto.timingSafeEqual(buf, hashedPassword)) {
          return cb(null, false, { message: "Incorrect username or password" });
        }
        return cb(null, user);
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user._id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Require controllers module
const user_controller = require("../controllers/userControllers");

/// USER ROUTES ///

// GET request for register a new User
router.get("/register", user_controller.user_registration_get);

// POST request for register a new User
router.post("/register", user_controller.user_registration_post);

// GET request for logIn a User
router.get("/login", user_controller.user_login_get);

// POST request for logIng a User
router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// POST request for log out
router.post("/logout", user_controller.user_logout_post);

// GET request for display User Profile.
router.get("/profile/:id", user_controller.user_profile);

module.exports = router;
