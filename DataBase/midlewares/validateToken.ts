import jwt from "jsonwebtoken";

import type {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";
import { resgisterSchema } from "../schemas/authSchema.js";

function validateToken() {
  return async (
    req: Request<ParamsDictionary, unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log({ message: "Authorization header required" });
      return res.status(401).json({
        message: "Authorization header required",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      console.log({ message: "Invalid authorization format" });
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }
    const token = authHeader.split(" ")[1];

    try {
      if (!process.env.JWT_SECRET) throw new Error("Authentification failed");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = resgisterSchema.parse(decoded);

      req.user = result;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log("Token expired");
        return res.status(401).json("Token expired");
      } else {
        console.log(error);
        return res.status(401).json(error);
      }
    }
  };
}

export default validateToken;
