const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// Require controller module
const messageController = require("../controllers/messageController");

/// Messages Routes ///

// Display all messages
router.get("/", messageController.message_display_all);

// Request for create a new message on GET
router.get("/create", isAuth, messageController.message_create_get);

// Request for create a new message on POST
router.post("/create", messageController.message_create_post);

// Request for a specific message
router.get("/:id", messageController.message_display_one);

// Request for edit a message
router.put("/:id", messageController.message_edit);

// Request for delete a message
router.delete("/:id", messageController.message_delete);

module.exports = router;
