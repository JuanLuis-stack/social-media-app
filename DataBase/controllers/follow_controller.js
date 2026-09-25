const fn = require("../services/notificationServices");

function getUserFollowers(db) {
  return async (req, res) => {
    const following_id = req.user.id;

    try {
      const result = await db.query(
        `
        SELECT 
        users.user_name 
        FROM users 
        JOIN follows 
        	ON users.id = follows.following_id 
        WHERE follows.follower_id = $1`,
        [following_id],
      );

      console.log({
        message: "Followers retrieved successfully",
        followed: result.rows,
      });
      return res.json({
        message: "Followers retrieved successfully",
        followed: result.rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error retrieving followers" });
    }
  };
}

function followUser(db) {
  return async (req, res) => {
    const follower_id = req.user.id;
    const { following_userName } = req.body;

    const client = await db.connect();

    try {
      await client.query("BEGIN");

      const following_id = await client.query(
        `SELECT id FROM users WHERE user_name = $1`,
        [following_userName],
      );

      if (following_id.rowCount === 0) {
        throw new Error(`user name ${following_userName} is not idenfied`);
      }

      if (follower_id === following_id.rows[0].id) {
        throw new Error("You cannot follow yourself");
      }

      const result = await client.query(
        `
        INSERT INTO follows (follower_id, following_id) 
        VALUES ($1, $2) RETURNING *
      `,
        [follower_id, following_id.rows[0].id],
      );

      await fn.createNotifications(client, {
        recipient_id: following_id.rows[0].id,
        actor_id: follower_id,
        type: "follow",
      });

      await client.query("COMMIT");
      console.log({
        message: "User followed successfully",
        followed: result.rows[0],
      });
      return res.status(201).json({
        message: "User followed successfully",
        followed: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      return res.status(500).json({ message: "Error following user" });
    } finally {
      client.release();
    }
  };
}

function unFollowUser(db) {
  return async (req, res) => {
    const follower_id = req.user.id;
    const { following_userName } = req.body;

    try {
      const following_id = await db.query(
        `SELECT id FROM users WHERE user_name = $1`,
        [following_userName],
      );

      if (following_id.rowCount === 0) {
        throw new Error(`user name ${following_userName} is not idenfied`);
      }

      const result = await db.query(
        `
        DELETE FROM follows WHERE follower_id = $1 and following_id = $2 RETURNING *
    `,
        [follower_id, following_id.rows[0].id],
      );

      console.log({
        message: "Unfollow action successfully excuted",
        followed: result.rows[0],
      });
      return res.json({
        message: "Unfollow action successfully excuted",
        followed: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error unfollowing user" });
    }
  };
}

module.exports = {
  getUserFollowers,
  followUser,
  unFollowUser,
};
