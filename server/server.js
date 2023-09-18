import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "./passportConfig.js";
import cookieParser from "cookie-parser";
import users from "./routes/user.js";
import passport from "passport";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());

app.use("/user", users);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
