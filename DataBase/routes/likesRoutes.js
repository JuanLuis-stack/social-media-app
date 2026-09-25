const express = require("express");
const route = express.Router();

const db = require("../1-DB");

const validateToken = require("../midlewares/validateToken");
const { getUserLikes } = require("../controllers/likesController");

route.get("/me", validateToken(), getUserLikes(db));

module.exports = route;

// No working...