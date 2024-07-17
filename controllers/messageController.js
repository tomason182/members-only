const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  console.log(req.user);
  res.render("new_message", {
    user: req.user,
  });
});

// @desc    Create a message
// @route   POST /messages/create
// @access  Private
exports.message_create_post = [
  body("title")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title should be minimum 3 and maximum 100 characters"),
  body("message")
    .trim()
    .escape()
    .isLength({ min: 3, max: 250 })
    .withMessage("Message should be minimum 3 and maximum 250 characters"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.render("new_message", {
        errors: errors,
      });
    }

    const newMessage = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.user._id,
    });

    await newMessage.save();
    res.redirect("/");
  }),
];

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
