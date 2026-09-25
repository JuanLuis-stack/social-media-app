// authRoutes.js

const express = require("express");
const route = express.Router();
const db = require("../1-DB.js");

const { registerUser, loginUser } = require("../controllers/authController.js");

const validateSchema = require("../midlewares/validateSchema.js");
const { resgisterSchema, loginSchema } = require("../schemas/authSchema.js");

route.post("/register", validateSchema(resgisterSchema), registerUser(db));
route.post("/login", validateSchema(loginSchema), loginUser(db));

module.exports = route;
