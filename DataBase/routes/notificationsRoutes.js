const express = require("express");
const route = express.Router();

const db = require("../1-DB");
const {
  getNotifications,
  readNotification,
  deleteNotificationById,
} = require("../controllers/notifications_controller");
const validateToken = require("../midlewares/validateToken");
const validatedId = require("../midlewares/validateId");

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

module.exports = route;
