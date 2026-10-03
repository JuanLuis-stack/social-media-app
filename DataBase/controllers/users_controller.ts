// controllers/users_controller.js

import { Pool } from "pg";
import type { Response } from "express";
import type { ParamsDictionary, Request } from "express-serve-static-core";

type User = {
  id: number;
  name: string;
  email: string;
  user_name: string;
  presentation: string | null;
};

type UserRetrievedType = User & {
  password: string;
  followers: number;
  is_current_user_following: boolean;
};

function getUsers(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      if (req.query.type === "AllUsers") {
        console.log("Workign from getUsers function");
      }

      const result = await db.query<User[]>(
        "SELECT id, name, email, user_name, presentation FROM users",
      );

      console.log(result.rows);
      res.json(result.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getUsersId(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const userId = req.params.user_id;
      const currentUserId = req.user.id;

      const result = await db.query<UserRetrievedType>(
        `SELECT 
	        users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation,
	        COUNT(DISTINCT follows.follower_id) as followers,
	        COALESCE(
	        	bool_or(follows.follower_id = $1),
	        	false
	        ) as is_current_user_following
	        from users
	        left join follows on users.id = follows.following_id
	        WHERE users.id = $2
	        group by
	        	users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation`,
        [currentUserId, userId],
      );

      console.log({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });

      res.json({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getUsersByUserName(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const userProfileName = req.params.user_name;
      const currentUserId = req.user.id;

      const result = await db.query<UserRetrievedType>(
        `SELECT 
	        users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation,
	        COUNT(DISTINCT follows.follower_id) as followers,
	        COALESCE(
	        	bool_or(follows.follower_id = $1),
	        	false
	        ) as is_current_user_following
	        from users
	        left join follows on users.id = follows.following_id
	        WHERE users.user_name = $2
	        group by
	        	users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation`,
        [currentUserId, userProfileName],
      );

      console.log(result.rows[0]);

      console.log({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });

      res.json({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function updateUsers(db: Pool) {
  return async (
    req: Request<ParamsDictionary, unknown, { name: string }>,
    res: Response,
  ) => {
    const { name } = req.body;

    try {
      const result = await db.query(
        `
          UPDATE users
          SET name = $1
          WHERE id = $2
          RETURNING *`,
        [name, req.user.id],
      );

      console.log({
        message: "User updated successfully",
        userUpdated: result.rows[0],
      });

      res.status(200).json({
        message: "User updated successfully",
        userUpdated: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function deleteUsers(db: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const result = await db.query(
        `
          DELETE FROM users where id = $1 RETURNING id, name, email, user_name`,
        [req.user.id],
      );

      console.log({
        message: "User deleted successfully",
        userDeleted: result.rows[0],
      });

      res.status(200).json({
        message: "User deleted successfully",
        userDeleted: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

export { getUsers, getUsersId, getUsersByUserName, updateUsers, deleteUsers };
