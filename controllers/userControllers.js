const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const crypto = require("node:crypto");
const { body, validationResult } = required("express-validator");

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
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("username must be specified")
    .isEmail()
    .withMessage("Username is not a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage("Password must be at least 5 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const salt = crypto.randomBytes(32).toString("hex");
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: crypto.pbkdf2(
        req.body.password,
        salt,
        100000,
        64,
        "sha512",
        function (err, hashedPassword) {
          if (err) {
            return next(err);
          }
        }
      ),
    });
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
exports.user_login_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User login on POST");
});

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
