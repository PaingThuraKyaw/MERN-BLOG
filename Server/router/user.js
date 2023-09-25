const { loginUser, register } = require("../controllers/controllerUser");

const UserRoute = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/user");
//login
UserRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please Enter an vaild email!"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password is too short!"),
  ],
  loginUser
);

//signup route
UserRoute.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter an vaild email!")
      .normalizeEmail(),
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username is too short"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 15 })
      .withMessage("Password is too short"),
  ],
  register
);

module.exports = UserRoute;
