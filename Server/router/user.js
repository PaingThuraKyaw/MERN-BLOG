const { loginUser, signUp } = require("../controllers/controllerUser");

const UserRoute = require("express").Router();

//login
UserRoute.post("/login", loginUser);

//signup route
UserRoute.post("/signup", signUp);

module.exports = UserRoute;
