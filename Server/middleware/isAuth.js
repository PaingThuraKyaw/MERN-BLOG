const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuth = (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) {
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }

  const token = header.split(" ")[1];
  const match = jwt.verify(token, process.env.SECRET_KEY);

  if (!match) {
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }
  next();
};

module.exports = isAuth;
