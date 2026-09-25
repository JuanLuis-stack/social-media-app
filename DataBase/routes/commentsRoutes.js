// routes/commentsRoutes.js

const express = require("express");
const route = express.Router();

const db = require("../1-DB.js");

const commentSchema = require("../schemas/commentSchema.js");
const validateSchema = require("../midlewares/validateSchema.js");

const { getComments } = require("../controllers/comments_controller.js");

route.get("/", getComments(db));

module.exports = route