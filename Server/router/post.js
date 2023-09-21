const { body } = require("express-validator");
const {
  getPost,
  CreatePost,
  postDetail,
  postDelete,
  oldPost,
  NewPost,
} = require("../controllers/controllerPost");

const postRouter = require("express").Router();

//GET
postRouter.get("/post", getPost);

//POST /create
postRouter.post(
  "/post/create",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    // body("file").notEmpty().withMessage("file is required"),
  ],
  CreatePost
);

//GET /post/:id
postRouter.get("/post/:id", postDetail);

//Get /post/delete/:id
postRouter.delete("/post/delete/:id", postDelete);

//get
postRouter.get("/post/update/:id", oldPost);

//put
postRouter.put("/post/update", NewPost);

module.exports = postRouter;
