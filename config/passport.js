const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("node:crypto");
const User = require("../models/user");

/// PASSPORT LOCAL STRATEGY CONFIG ///
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({ username: username });

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
    return cb(null, user.id);
  });
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id).select([
      "first_name",
      "last_name",
      "username",
      "member_status",
      "admin",
    ]);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;
