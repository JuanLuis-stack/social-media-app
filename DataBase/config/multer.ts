//  config/multer.js

import multer from "multer";
import crypto from "crypto";
import type { Request } from "express";

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    callback(null, "uploads/");
  },

  filename(req: Request, file: Express.Multer.File, callback) {
    callback(null, `${crypto.randomUUID()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
