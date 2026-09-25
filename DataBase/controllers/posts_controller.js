// controllers/posts_controller.js
const fn = require("../services/notificationServices");

function getPost(db) {
  return async (req, res) => {
    try {
      const id = req.user.id;
      const result = await db.query(
        `
            SELECT
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type,
                COUNT(DISTINCT likes.id) AS likes,
                COUNT(DISTINCT comments.id) as comments,
                COALESCE(
                    BOOL_OR(likes.user_id = $1),
                    false
                ) AS liked_by_current_user
            FROM posts
            JOIN users
                ON posts.user_id = users.id
            LEFT JOIN likes
                ON posts.id = likes.post_id
            LEFT JOIN comments
                ON posts.id = comments.post_id
            GROUP BY
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type
                ORDER BY posts.created_at DESC;
            `,
        [id],
      );

      console.log({
        message: "posts retrived successfully",
        posts: result.rows,
      });
      res.status(200).json({
        message: "posts retrived successfully",
        posts: result.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
}

function getPostById(db) {
  return async (req, res) => {
    try {
      const result = await db.query(
        `SELECT
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type,
                COUNT(DISTINCT likes.id) AS likes,
                COUNT(DISTINCT comments.id) as comments,
                COALESCE(
                    BOOL_OR(likes.user_id = $1),
                    false
                ) AS liked_by_current_user
            FROM users
            JOIN posts
                ON posts.user_id = users.id
            LEFT JOIN likes
                ON posts.id = likes.post_id
            LEFT JOIN comments
                ON posts.id = comments.post_id
            WHERE posts.id = $2
            GROUP BY
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type
                ORDER BY posts.created_at DESC;
            `,
        [req.user.id, req.params.id],
      );

      console.log({
        message: "post retrieved successfully",
        post: result.rows[0],
      });
      res.status(200).json({
        message: "post retrieved successfully",
        post: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getPostByUserName(db) {
  return async (req, res) => {
    try {
      const id = req.params.user_name;
      const user_id = req.user.id;
      console.log(id);

      const result = await db.query(
        `
            SELECT
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type,
                COUNT(DISTINCT likes.id) AS likes,
                COUNT(DISTINCT comments.id) as comments,
                COALESCE(
                    BOOL_OR(likes.user_id = $1),
                    false
                ) AS liked_by_current_user
            FROM users
            JOIN posts
                ON posts.user_id = users.id
            LEFT JOIN likes
                ON posts.id = likes.post_id
            LEFT JOIN comments
                ON posts.id = comments.post_id
            WHERE users.user_name = $2
            GROUP BY
                posts.id,
                posts.title,
                posts.content,
                users.name,
                posts.created_at,
                posts.user_name,
                posts.media_url,
                posts.media_type
                ORDER BY posts.created_at DESC;
            `,
        [user_id, id],
      );

      console.log({
        message: "posts founed successfully",
        posts: result.rows,
      });

      res.status(200).json({
        message: "posts founed successfully",
        posts: result.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  };
}

function createPost(db) {
  return async (req, res) => {
    let client;
    try {
      client = await db.connect();
      const { title, content } = req.body;
      const user_id = req.user.id;

      const media = req.file ? req.file.filename : null;
      const media_type = req.file ? req.file.mimetype : null;

      await client.query("BEGIN");

      const user_name = await client.query(
        `select user_name from users where id = $1`,
        [user_id],
      );
      const result = await client.query(
        `
                INSERT INTO posts 
                (title, content, media_url, media_type, user_id, user_name) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`,
        [
          title,
          content,
          media,
          media_type,
          user_id,
          user_name.rows[0].user_name,
        ],
      );

      const followers = await client.query(
        `
        SELECT follower_id FROM follows WHERE following_id = $1
        `,
        [user_id],
      );

      for (const follower of followers.rows) {
        await fn.createNotifications(client, {
          recipient_id: follower.follower_id,
          actor_id: user_id,
          type: "new_post",
          post_id: result.rows[0].id,
        });
      }

      console.log({
        message: "post added successfully",
        post: result.rows[0],
      });

      await client.query("COMMIT");

      return res.status(201).json({
        message: "post added successfully",
        post: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      if (client) {
        await client.query("ROLLBACK");
      }
      return res.status(500).json({ message: "Something went wrong" });
    } finally {
      client?.release();
    }
  };
}

module.exports = {
  getPost,
  getPostById,
  getPostByUserName,
  createPost,
};
