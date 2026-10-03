import express from "express";
const route = express.Router();

import db from "../1-DB.js";

import {
  getNotifications,
  readNotification,
  deleteNotificationById,
} from "../controllers/notifications_controller.js";

import validateToken from "../midlewares/validateToken.js";
import validatedId from "../midlewares/validateId.js";

route.get(`/`, getNotifications(db));

route.patch(
  `/:id/read`,
  validateToken(),
  validatedId(db, "notifications"),
  readNotification(db),
);

route.delete(
  `/:id`,
  validateToken(),
  validatedId(db, "notifications"),
  deleteNotificationById(db),
);

export default route;
