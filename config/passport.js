const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("../models/user");
const crypto = require("node:crypto");

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({ username });
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
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return cb(null, false, { message: "Incorrect username or password" });
        }
        return cb(null, user);
      }
    );
  })
);
