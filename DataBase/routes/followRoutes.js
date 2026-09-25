const express = require("express");
const route = express.Router();
const db = require("../1-DB.js");
const { getUserFollowers } = require("../controllers/follow_controller.js");
const validateToken = require("../midlewares/validateToken.js");

route.get("/followers", validateToken(), getUserFollowers(db));

module.exports = route;
