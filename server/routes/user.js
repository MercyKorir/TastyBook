import express from "express";
import User from "../models/UserModel.js";
import { connectToMongoDB } from "../db/conn.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { generateToken, verifyToken } from "../middleware/authMiddleware.js";
import {
  generateResetToken,
  sendPasswordResetEmail,
} from "../utils/resetPassword.js";

const router = express.Router();

connectToMongoDB();

// Register User
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPwd,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error("Error registering user", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login as User
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = generateToken(user);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: `Logged in successfully as ${user.username}` });
  })(req, res, next);
});

// Verify User
router.get("/verify", verifyToken, (req, res) => {
  const user = req.user;
  res.json({ status: true, user });
});

// Logout User
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// Delete User
router.delete("/delete", verifyToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.clearCookie("token");
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error("Error deleting user: ", err);
    res.status(500).json({ error: "Error deleting user account" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = generateResetToken(user);
    await user.updateOne({ resetToken });

    sendPasswordResetEmail(user, resetToken);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Error sending password reset to email", err);
    res.status(500).json({ message: "Error sending Reset token" });
  }
});

// Reset password
router.patch("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    const user = await User.findOne({ email, resetToken });

    if (!user) {
      return res.status(404).json({ error: "User not found or invalid token" });
    }
    const hashedNewPwd = await bcrypt.hash(newPassword, 10);

    await user.updateOne({ password: hashedNewPwd, resetToken: null });
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password: ", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

export default router;
