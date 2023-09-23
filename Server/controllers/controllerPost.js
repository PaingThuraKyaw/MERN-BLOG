const { validationResult } = require("express-validator");
const Post = require("../models/post");
const { unLink } = require("../util/unLink");
exports.getPost = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 6;
  let totalPost;
  let totalPage;
  // 12 /6 
  Post.find()
    .countDocuments()
    .then((post) => {
      totalPost = post;
      totalPage = Math.ceil(totalPost / perPage)
      return Post.find()
        .sort({ createdAt: 1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((post) => {
      return res.status(200).json({
        post,
        totalPost,
        totalPage
      });
    })
    .catch(() => {
      return res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.CreatePost = (req, res, next) => {
  const { title, description, id } = req.body; // Correctly extracts title, description, and id

  const file = req.file;

  const errors = validationResult(req);

  if (!errors.isEmpty() && !req.file) {
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
        message: "Invalid Post",
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
    .then((result) => {
      if (result.file) {
        unLink(result.file);
      }
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
  const file = req.file;
  console.log(_id);
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    post.title = title;
    post.description = description;
    if (file) {
      if (post.file) {
        unLink(post.file);
      }
      post.file = `upload/${file.filename}`;
    }
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
