import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const { SECRET_KEY } = process.env;

export function generateToken(user) {
  return jwt.sign({ userId: user._id }, SECRET_KEY, {
    expiresIn: "24h",
  });
}

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed", status: false });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed", status: false });
    }
    try {
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
        // console.log("User Verified Successfully")
        return next();
      } else {
        return res
          .status(401)
          .json({ message: "Authentication failed", status: false });
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      return res
        .status(401)
        .json({ message: "Authentication failed", status: false });
    }
  });
}
