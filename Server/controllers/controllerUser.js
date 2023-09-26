const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Signup User
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }

  const { email, password, username } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      username,
    });

    res.status(201).json({
      message: "User created",
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
