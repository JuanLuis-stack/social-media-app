// likeController.js

// import createNotifications from "../services/notificationServices";

const fn = require("../services/notificationServices");

function eventLike(db) {
  return async (req, res) => {
    const client = await db.connect();
    try {
      const user_id = req.user.id;
      const post_id = Number(req.params.id);
      let liked_by_current_user = false;

      const likedByUser = await client.query(
        `SELECT * FROM likes where user_id = $1 AND post_id = $2`,
        [user_id, post_id],
      );

      if (likedByUser.rowCount > 0) {
        await client.query(
          `
            DELETE FROM likes 
            WHERE id = $1 RETURNING *`,
          [likedByUser.rows[0].id],
        );

        liked_by_current_user = false;
      } else {
        await client.query(
          `
            INSERT INTO likes (user_id, post_id)
            values ($1, $2) RETURNING *`,
          [user_id, post_id],
        );

        liked_by_current_user = true;

        const postIdRequest = await client.query(
          `SELECT user_id from posts WHERE id = $1`,
          [post_id],
        );

        const recipient_id = postIdRequest.rows[0].user_id;

        if (postIdRequest.rows[0].user_id !== user_id) {
          await fn.createNotifications(client, {
            recipient_id,
            actor_id: user_id,
            type: "like",
            post_id,
          });
        }
      }

      const likes = await client.query(
        `SELECT COUNT(*) FROM likes where post_id = $1`,
        [post_id],
      );

      const countLikes = likes.rows[0].count;

      console.log({
        post_id,
        liked_by_current_user: liked_by_current_user,
        likes: countLikes,
      });

      res.status(200).json({
        post_id,
        liked_by_current_user: liked_by_current_user,
        likes: countLikes,
      });
      await client.query("COMMIT");
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      return res.status(500).json({ message: "Something went wrong" });
    } finally {
      client.release();
    }
  };
}

module.exports = eventLike;
