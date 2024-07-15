const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// @desc    Display all messages no info
// @route   GET /messages
// @access  Public
exports.message_display_all = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Display all messages");
});

// @desc    Create a message
// @route   POST /messages
// @access  Private
exports.message_create = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create a msj");
});

// @desc    Edit a message
// @route   PUT /messages/:id
// @access  Private
exports.message_edit = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Edit a msj");
});

// @desc    Delete a message
// @route   DELETE /messages/:id
// @access  Private
exports.message_delete = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Delete a msj");
});
