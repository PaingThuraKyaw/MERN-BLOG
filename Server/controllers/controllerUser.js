const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup User
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }

  //body
  const { email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      return User.create({
        email,
        password: hashPassword,
        username,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: "User created",
        userId: result.id,
      });
    })
    .catch((_) => {
      res.status(400).json({
        message: "Something went wrong",
      });
    });
};

//login User
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }

  const { email, password } = req.body;
  User.findOne({ email }).then((userRes) => {
    if (!userRes) {
      throw new Error("E-mail is not exists");
    }
    return bcrypt
      .compare(password, userRes.password)
      .then((result) => {
        if (!result) {
          res.status(401).json({
            message: "Unauthorized",
          });
        }
        return res.status(200).json({
          message: "Login success",
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  });
};
