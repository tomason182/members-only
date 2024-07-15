const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// @desc    Register new User
// @route   POST /users/register
// @access  Public
exports.user_registration = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User registration");
});

// @desc    Authenticate a User
// @route   POST  /users/login
// @access  Public
exports.user_login = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User log in");
});

// @desc    Get User Info
// @route   GET /users/profile
// @access  Private
exports.user_profile = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User profile");
});
