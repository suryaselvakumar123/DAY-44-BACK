import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-Auth-token");
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log("Error occurred during authentication:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
