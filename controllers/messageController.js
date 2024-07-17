const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// @desc    Display all messages no info
// @route   GET /messages
// @access  Public
exports.message_display_all = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "List of all messages",
    user: req.user,
  });
});

/// CREATE A NEW MESSAGE

// @desc    Create a message
// @route   GET /messages/create
// @access  Private
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create a message on GET");
});

// @desc    Create a message
// @route   POST /messages/create
// @access  Private
exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create a message on POST");
});

/// RETRIEVE AN SPECIFIC MESSAGE ///

// @desc    Get an specific message by id
// @route   GET /messages/:id
// @access  Private
exports.message_display_one = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Retrieve message with id: ${req.params.id}`);
});

/// EDIT A MESSAGE ///

// @desc    Edit a message
// @route   PUT /messages/:id
// @access  Private
exports.message_edit = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Edit message ${req.params.id}`);
});

/// DELETE A MESSAGE ///

// @desc    Delete a message
// @route   DELETE /messages/:id
// @access  Private
exports.message_delete = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Delete the message ${req.params.id}`);
});
