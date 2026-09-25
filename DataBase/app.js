// app.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

const usersRouter = require("./routes/usersRoutes.js");
const postsRouter = require("./routes/postsRoutes.js");
const commentsRouter = require("./routes/commentsRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const followRouter = require("./routes/followRoutes.js");
const notificationsRouter = require("./routes/notificationsRoutes.js");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/follow", followRouter);
app.use("/notifications", notificationsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
