// authRoutes.js

import express from "express";
const route = express.Router();
import db from "../1-DB.js";

import { registerUser, loginUser } from "../controllers/authController.js";

import validateSchema from "../midlewares/validateSchema.js";
import { resgisterSchema, loginSchema } from "../schemas/authSchema.js";

route.post("/register", validateSchema(resgisterSchema), registerUser(db));
route.post("/login", validateSchema(loginSchema), loginUser(db));

export default route;
