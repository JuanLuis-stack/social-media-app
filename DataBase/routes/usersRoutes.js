// routes/usersRoutes.js

const express = require("express");
const route = express.Router();
const db = require("../1-DB.js");

const userSchema = require("../schemas/userEditSchema.js");
const postSchema = require("../schemas/postSchema.js");
const followSchema = require("../schemas/followSchema.js");

const validateSchema = require("../midlewares/validateSchema.js");
const validateUsersID = require("../midlewares/validateId.js");
const validateToken = require("../midlewares/validateToken.js");
const upload = require("../config/multer.js");

const {
  getUsers,
  getUsersByUserName,
  updateUsers,
  deleteUsers,
  getUsersId,
} = require("../controllers/users_controller.js");

const {
  createPost,
  getPostByUserName,
} = require("../controllers/posts_controller.js");
const {
  getUserFollowers,
  followUser,
  unFollowUser,
} = require("../controllers/follow_controller.js");
const {
  getNotificationsByUserId,
  getUnReadNotificationsByUserId,
  getNotificationsByType,
} = require("../controllers/notifications_controller.js");

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
  validateSchema(userSchema),
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

module.exports = route;
