// app.js

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));
app.use(express.json());

import usersRouter from "./routes/usersRoutes.js";
import postsRouter from "./routes/postsRoutes.js";
import commentsRouter from "./routes/commentsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import followRouter from "./routes/followRoutes.js";
import notificationsRouter from "./routes/notificationsRoutes.js";

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/follow", followRouter);
app.use("/notifications", notificationsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
