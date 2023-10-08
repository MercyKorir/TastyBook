import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email address"],
  },
  username: {
    type: String,
    required: [true, "UserName is required"],
    maxLength: [35, "Should be less than 35 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  recipes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  resetToken: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
