// routes/commentsRoutes.js

import express from "express";
const route = express.Router();

import db from "../1-DB.js";

import { getComments } from "../controllers/comments_controller.js";

route.get("/", getComments(db));

export default route;
