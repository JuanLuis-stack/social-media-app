function getNotifications(db) {
  return async (req, res) => {
    try {
      const response = await db.query(
        `SELECT * from notifications ORDER BY id DESC`,
      );

      console.log({
        message: "notifications retrieved successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "notifications retrieved successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function getNotificationsByUserId(db) {
  return async (req, res) => {
    const id = req.user.id;

    try {
      const response = await db.query(
        `SELECT * from notifications WHERE recipient_id = $1 ORDER BY id DESC`,
        [id],
      );

      console.log({
        message: "notifications retrieved successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "notifications retrieved successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function getUnReadNotificationsByUserId(db) {
  return async (req, res) => {
    const id = req.user.id;

    try {
      const response = await db.query(
        `SELECT * FROM notifications WHERE recipient_id = $1 AND is_read = false ORDER BY id DESC`,
        [id],
      );

      console.log({
        message: "unread notifications retrieved successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "unread notifications retrieved successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function getNotificationsByType(db) {
  return async (req, res) => {
    const id = req.user.id;
    const type = req.params.type;
    console.log(type);

    try {
      const response = await db.query(
        `SELECT * FROM notifications WHERE recipient_id = $1 AND type = $2 ORDER BY id DESC`,
        [id, type],
      );

      console.log({
        message: "notifications retrieved by type successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "notifications retrieved by type successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function readNotification(db) {
  return async (req, res) => {
    const id = req.params.id;

    try {
      const response = await db.query(
        `UPDATE notifications
        SET is_read = true
        WHERE id = $1 RETURNING *`,
        [id],
      );

      console.log({
        message: "notification readed successfully",
        notifications: response.rows[0],
      });

      res.status(200).json({
        message: "notification readed successfully",
        notifications: response.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function readAllNotification(db) {
  return async (req, res) => {
    const user_id = req.user.id;

    try {
      const response = await db.query(
        `UPDATE notifications
        SET is_read = true
        WHERE recipient = $1`,
        [user_id],
      );

      console.log({
        message: "notifications readed successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "notifications readed successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

function deleteNotificationById(db) {
  return async (req, res) => {
    const NotificationId = req.params.id;

    try {
      const response = await db.query(
        `DELETE FROM notifications WHERE id = $1 RETURNING *`,
        [NotificationId],
      );

      console.log({
        message: "Notification deleted successfully",
        notifications: response.rows,
      });

      res.status(200).json({
        message: "Notification deleted successfully",
        notifications: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

module.exports = {
  getNotifications,
  getNotificationsByUserId,
  getNotificationsByType,
  getUnReadNotificationsByUserId,
  readNotification,
  readAllNotification,
  deleteNotificationById,
};
