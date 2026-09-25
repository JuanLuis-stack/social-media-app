// routes/postsRoutes.js

const express = require("express");
const route = express.Router();
const db = require("../1-DB.js");

const postSchema = require("../schemas/postSchema.js");
const commentSchema = require("../schemas/commentSchema.js");

const validateSchema = require("../midlewares/validateSchema.js");
const validateID = require("../midlewares/validateId.js");
const validateToken = require("../midlewares/validateToken.js");

const { getPost, getPostById } = require("../controllers/posts_controller.js");

const {
  getCommentsById,
  createComment,
} = require("../controllers/comments_controller.js");
const eventLike = require("../controllers/likesController.js");

route.get("/", validateToken(), getPost(db));

route.get("/:id", validateToken(), validateID(db, "posts"), getPostById(db));

route.get(
  "/:id/comments",
  validateToken(),
  validateID(db, "posts"),
  getCommentsById(db),
);
route.post(
  "/:id/likes",
  validateToken(),
  validateID(db, "posts"),
  eventLike(db),
);

route.post(
  "/:id/comments",
  validateToken(),
  validateID(db, "posts"),
  validateSchema(commentSchema),
  createComment(db),
);

module.exports = route;
