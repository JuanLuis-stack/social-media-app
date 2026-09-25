// authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function registerUser(db) {
  return async (req, res) => {
    const { name, user_name, email, password } = req.body;

    try {
      if (!name || !user_name || !email || !password) {
        console.log({ message: "All fields are required" });
        return res.status(400).json({ message: "All fields are required" });
      }

      const sameImail = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      const sameUserName = await db.query(
        "SELECT * FROM users WHERE user_name = $1",
        [user_name],
      );

      if (sameImail.rows.length > 0) {
        console.log({ message: "Email already exists" });
        return res.status(400).json({ message: "Email already exist" });
      }

      if (sameUserName.rows.length > 0) {
        console.log({ message: "User name already exist" });
        return res.status(400).json({ message: "User name already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.query(
        `INSERT INTO users (name, email, password, user_name) VALUES ($1, $2, $3, $4) RETURNING id, name, user_name, email`,
        [name, email, hashedPassword, user_name],
      );

      const token = jwt.sign(result.rows[0], process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("User registered successfully:", result.rows[0]);

      console.log({
        message: "User registered successfully",
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: null,
        },
        token: token,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: null,
        },
        token: token,
      });
    } catch (error) {
      if (error.code === "23505") {
        console.log({ message: "Email or user name already exists" });
        return res
          .status(409)
          .json({ message: "Email or user name already exists" });
      }

      console.error("Registration failed:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function loginUser(db) {
  return async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length === 0) {
        console.log({ message: "User not found" });
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = user.rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        console.log({ message: "Invalid credentials" });
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(user.rows[0], process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log({
        message: "Login successful",
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          user_name: user.rows[0].user_name,
          presentation: user.rows[0].presentation,
        },
        token: token,
      });
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          user_name: user.rows[0].user_name,
          presentation: user.rows[0].presentation,
        },
        token: token,
      });
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = { registerUser, loginUser };
