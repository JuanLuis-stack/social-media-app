import express from "express";
const route = express.Router();

import db from "../1-DB.js";

import validateToken from "../midlewares/validateToken.js";
import getUserLikes from "../controllers/likesController.js";

route.get("/me", validateToken(), getUserLikes(db));

export default route;
