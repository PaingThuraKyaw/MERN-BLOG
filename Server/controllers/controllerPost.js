const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPost = (req, res) => {
  Post.find()
    .sort({ createdAt: 1 })
    .then((post) => {
      return res.status(200).json({
        post,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.CreatePost = (req, res, next) => {
  const { title, description, id } = req.body;
  const file = req.file;
  console.log(req.file);
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }
  Post.create({
    title,
    description,
    id,
    file: file ? `upload/${file.filename}` : false,
  })
    .then(() => {
      return res.status(201).json({
        message: "Post created",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Invaild Post",
      });
    });
};

//
exports.postDetail = (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.postDelete = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json({
        message: "Delete Post",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.oldPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    });
};

exports.NewPost = async (req, res) => {
  const { _id, title, description } = req.body;
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    post.title = title;
    post.description = description;
    await post.save();
    return res.status(200).json({
      message: "Post updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
