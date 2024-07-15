const User = require("../models/user");
const asyncHandler = require("express-async-handler");

/// USER REGISTRATION CONTROLLER ///

// @desc    Register a new user
// @route   GET /users/register
// @access  Public
exports.user_registration_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User registration on GET");
});

// @desc    Register new User
// @route   POST /users/register
// @access  Public
exports.user_registration_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User registration on POST");
});

/// USER LOGIN CONTROLLER ///

// @desc    Authenticate a User
// @route   GET  /users/login
// @access  Public
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User login on GET");
});

// @desc    Authenticate a User
// @route   POST  /users/login
// @access  Public
exports.user_login_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User login on POST");
});

/// USER PROFILE CONTROLLER ///

// @desc    Get User Info
// @route   GET /users/profile
// @access  Private
exports.user_profile = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: User ${req.params.id} profile`);
});
