// routes/usersRoutes.js

import express from "express";
const route = express.Router();
import db from "../1-DB.js";

import userEditSchema from "../schemas/userEditSchema.js";
import postSchema from "../schemas/postSchema.js";
import followSchema from "../schemas/followSchema.js";

import validateSchema from "../midlewares/validateSchema.js";
import validateUsersID from "../midlewares/validateId.js";
import validateToken from "../midlewares/validateToken.js";
import upload from "../config/multer.js";

import {
  getUsers,
  getUsersByUserName,
  updateUsers,
  deleteUsers,
  getUsersId,
} from "../controllers/users_controller.js";

import {
  createPost,
  getPostByUserName,
} from "../controllers/posts_controller.js";

import {
  getUserFollowers,
  followUser,
  unFollowUser,
} from "../controllers/follow_controller.js";

import {
  getNotificationsByUserId,
  getUnReadNotificationsByUserId,
  getNotificationsByType,
} from "../controllers/notifications_controller.js";

route.get("/", getUsers(db));

route.get(
  "/:user_name/user_name",
  validateToken(),
  validateUsersID(db, "users"),
  getUsersByUserName(db),
);
route.get(
  "/:user_id/user_id",
  validateToken(),
  validateUsersID(db, "users"),
  getUsersId(db),
);

route.get("/me", validateToken(), getUsersByUserName(db));

route.get("/:user_name/posts", validateToken(), getPostByUserName(db));
route.get("/me/followers", validateToken(), getUserFollowers(db));
route.get("/me/notifications", validateToken(), getNotificationsByUserId(db));

route.get(
  "/me/unread/notifications",
  validateToken(),
  getUnReadNotificationsByUserId(db),
);
route.get(
  "/me/:type/notifications",
  validateToken(),
  getNotificationsByType(db),
);

route.get(
  "/me/posts",
  validateToken(),
  validateUsersID(db, "users"),
  getPostByUserName(db),
);

route.patch(
  "/me",
  validateToken(),
  validateUsersID(db, "users"),
  validateSchema(userEditSchema),
  updateUsers(db),
);

route.post(
  "/me/posts",
  validateToken(),
  upload.single("media"),
  validateUsersID(db, "users"),
  validateSchema(postSchema),
  createPost(db),
);

route.post(
  "/me/follow",
  validateToken(),
  validateSchema(followSchema),
  followUser(db),
);

route.delete(
  "/me/unfollow",
  validateToken(),
  validateSchema(followSchema),
  unFollowUser(db),
);

route.delete("/me", validateUsersID(db, "users"), deleteUsers(db));

export default route;
