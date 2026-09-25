// controllers/comments_controller.js

const fn = require("../services/notificationServices");

function getComments(db) {
  return async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM comments");

      console.log({ comments: result.rows });
      res.status(200).json({ comments: result.rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getCommentsById(db) {
  return async (req, res) => {
    try {
      const result = await db.query(
        `
        SELECT 
	    comments.id,
	    comments.content,
	    comments.post_id,
	    comments.created_at,
	    comments.user_id,
	    users.user_name as author
        from comments
        join users on comments.user_id = users.id
        where comments.post_id = $1
        order by comments.created_at asc`,
        [req.params.id],
      );

      console.log({
        message: "Coments retrived successfully",
        comment: result.rows,
        comments: result.rowCount,
      });

      res.status(200).json({
        message: "Coments retrived successfully",
        comment: result.rows,
        comments: result.rowCount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function createComment(db) {
  return async (req, res) => {
    try {
      const client = await db.connect();
      const { content } = req.body;
      const post_id = req.params.id;
      const user_id = req.user.id;

      await client.query("BEGIN");

      const result = await client.query(
        "INSERT INTO comments (content, post_id, user_id) values($1, $2, $3) RETURNING *",
        [content, post_id, user_id],
      );

      const postIdRequest = await client.query(
        `SELECT user_id from posts WHERE id = $1`,
        [post_id],
      );

      const recipient_id = postIdRequest.rows[0].user_id;

      if (postIdRequest.rows[0].user_id !== user_id) {
        await fn.createNotifications(client, {
          recipient_id,
          actor_id: user_id,
          type: "comment",
          post_id,
          comment_id: result.rows[0].id,
        });
      }

      console.log({
        message: "Comment posted successfully",
        comment: result.rows[0],
      });

      res.status(201).json({
        message: "Comment posted successfully",
        comment: result.rows[0],
      });

      await client.query("COMMIT");
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      res.status(500).json({ message: "Something went wrong" });
    } finally {
      client.release();
    }
  };
}

module.exports = {
  getComments,
  getCommentsById,
  createComment,
};
