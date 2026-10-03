// controllers/comments_controller.js

import type { Request, Response } from "express";
import { Pool } from "pg";
import type { Comments, Comment } from "../../shared/Schemas/commentSchema.js";

import createNotification from "../services/notificationServices.js";

function getComments(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const result = await db.query<Omit<Comments, "author">>(
        "SELECT * FROM comments",
      );

      console.log({ comments: result.rows });
      res.status(200).json({ comments: result.rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getCommentsById(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const result = await db.query<Comments>(
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

function createComment(db: Pool) {
  return async (req: Request, res: Response) => {
    let client;
    try {
      client = await db.connect();
      const { content } = req.body;
      const post_id = Number(req.params.id);
      const user_id = req.user.id;

      await client.query("BEGIN");

      const result = await client.query<Comment>(
        "INSERT INTO comments (content, post_id, user_id) values($1, $2, $3) RETURNING *",
        [content, post_id, user_id],
      );

      const postIdRequest = await client.query(
        `SELECT user_id from posts WHERE id = $1`,
        [post_id],
      );

      if (!result.rows[0]) throw new Error("Something else");

      const recipient_id = postIdRequest.rows[0].user_id;

      if (postIdRequest.rows[0].user_id !== user_id) {
        await createNotification(client, {
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
      if (client) {
        await client.query("ROLLBACK");
      }
      res.status(500).json({ message: "Something went wrong" });
    } finally {
      client?.release();
    }
  };
}

export { getComments, getCommentsById, createComment };
