// routes/postsRoutes.js

import express from "express";
const route = express.Router();
import db from "../1-DB.js";

import { commentSchema } from "../schemas/commentSchema.js";

import validateSchema from "../midlewares/validateSchema.js";
import validateID from "../midlewares/validateId.js";
import validateToken from "../midlewares/validateToken.js";

import { getPost, getPostById } from "../controllers/posts_controller.js";

import {
  getCommentsById,
  createComment,
} from "../controllers/comments_controller.js";
import eventLike from "../controllers/likesController.js";

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

export default route;
