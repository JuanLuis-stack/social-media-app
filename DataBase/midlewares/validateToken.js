const jwt = require("jsonwebtoken");

function validateToken() {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log({ message: "Authorization header required" });
      return res.status(401).json({
        message: "Authorization header required",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      console.log({ message: "Invalid authorization format" });
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log("Token expired");
        return res.status(401).json("Token expired");
      } else {
        console.log("Invalid token");
        return res.status(401).json("invalid token");
      }
    }
  };
}

module.exports = validateToken;
