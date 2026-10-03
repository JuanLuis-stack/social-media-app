// middlewares/validateSchema.ts

import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

function validateSchema<T>(schema: z.ZodType<T>) {
  return (
    req: Request<ParamsDictionary, unknown, T>,
    res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log({
        message: "Validation failed",
        error: result.error.issues,
      });

      return res.status(400).json({
        message: "Validation failed",
        error: result.error.issues,
      });
    }

    req.body = result.data;
    next();
  };
}

export default validateSchema;
