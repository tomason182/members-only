const passport = require("../config/passport");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const crypto = require("node:crypto");

/// USER REGISTRATION CONTROLLER ///

// @desc    Register a new user
// @route   GET /users/register
// @access  Public
exports.user_registration_get = asyncHandler(async (req, res, next) => {
  res.render("signup");
});

// @desc    Register new User
// @route   POST /register
// @access  Public
exports.user_registration_post = [
  body("first_name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters"),
  body("username").isEmail().withMessage("Username is not a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage("Password must be at least 5 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", {
        errors: errors.array(),
      });
    }

    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
      return res.render("signup", {
        errors: [{ msg: "User already exist" }],
      });
    }

    const salt = crypto.randomBytes(32).toString("hex");
    crypto.pbkdf2(
      req.body.password,
      salt,
      100000,
      64,
      "sha512",
      async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          hashed_password: hashedPassword.toString("hex"),
          salt: salt,
        });

        try {
          await user.save();
          res.redirect("/login");
        } catch (err) {
          return next(err);
        }
      }
    );
  }),
];

/// USER LOGIN CONTROLLER ///

// @desc    Authenticate a User
// @route   GET  /users/login
// @access  Public
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login_form");
});

// @desc    Authenticate a User
// @route   POST  /users/login
// @access  Public
exports.user_login_post = [
  body("username").isEmail().withMessage("Username is not a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at lease 5 characters"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login_form", {
        errors: errors.array(),
      });
    }

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next);
  }),
];

/// USER LOG OUT ///
exports.user_logout_post = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
/// USER PROFILE CONTROLLER ///

// @desc    Get User Info
// @route   GET /users/profile
// @access  Private
exports.user_profile = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User ${req.params.id} profile`);
});

/// STATUS ///

// @desc  get Status page
// @route GET /status
// @access Private

exports.status_page_get = asyncHandler(async (req, res, next) => {
  res.render("status", {
    user: req.user,
  });
});

// @desc Update User status
// @route PUT /status
// @access Private
exports.user_status_post = [
  body("code")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("You need to enter a valid CODE"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("status", {
        user: req.user,
        errors: errors.array(),
      });
      return;
    }

    if (req.body.code !== "VIPCODE") {
      res.render("status", {
        user: req.user,
        errors: [{ msg: "Invalid code" }],
      });
      return;
    }
    console.log(req.user.username);

    await User.findOneAndUpdate(
      { username: req.user.username },
      { member_status: "vip" },
      {
        returnOriginal: false,
      }
    );
    res.redirect("/messages");
  }),
];
