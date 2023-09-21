const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Lucas",
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("mern-blog", postSchema);
