const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const postRouter = require("./router/post");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const UserRoute = require("./router/user");
const path = require("path");
const bodyParser = require("body-parser");
//Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors
app.use(cors());

//multer storage
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalname = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, uniqueSuffix + "-" + originalname);
  },
});

//multer fileFilter
const fileConfig = (req, file, cb) => {
  const con =
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg";
  if (con) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

//multer fn

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(
  multer({ storage: storageConfig, fileFilter: fileConfig }).single("file")
);

//route
app.use(postRouter);
app.use(UserRoute);

//mongodb && mongoose
mongoose.connect(process.env.MONGODB_URL).then((_) => {
  console.log("connect");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
