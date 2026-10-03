import express from "express";
const route = express.Router();
import db from "../1-DB.js";
import { getUserFollowers } from "../controllers/follow_controller.js";
import validateToken from "../midlewares/validateToken.js";

route.get("/followers", validateToken(), getUserFollowers(db));

export default route;
