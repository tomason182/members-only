const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controllers module
const user_controller = require("../controllers/userControllers");

/// USER ROUTES ///

// GET request for register a new User
router.get("/register", user_controller.user_registration_get);

// POST request for register a new User
router.post("/register", user_controller.user_registration_post);

// GET request for logIn a User
router.get("/login", user_controller.user_login_get);

// POST request for logIng a User
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  }),
  user_controller.user_login_post
);

// GET request for display User Profile.
router.get("/profile/:id", user_controller.user_profile);

module.exports = router;
