// middlewares/validateId.js

import { Request } from "express";
import type {
  NextFunction,
  ParamsDictionary,
  Response,
} from "express-serve-static-core";
import type { Pool } from "pg";

function validatedId<T>(
  db: Pool,
  table: "users" | "notifications" | "posts" | "comments" | "likes",
) {
  return async (
    req: Request<ParamsDictionary, unknown, T>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id) || Number(req.user.id);

      if (Number.isNaN(id)) {
        console.log({ message: "Id must to be a number" });
        return res.status(400).json({ message: "Id must to be a number" });
      }

      const result = await db.query(`SELECT * FROM ${table} where id = $1`, [
        id,
      ]);

      if (result.rows.length === 0) {
        console.log({ message: "Id not found" });
        return res.status(404).json({ message: "Id not found" });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

export default validatedId;
