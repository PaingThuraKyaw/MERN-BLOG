const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: "mern-blog",
  },
});

module.exports = model("User", User);
