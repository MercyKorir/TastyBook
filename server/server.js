import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "./passportConfig.js";
import cookieParser from "cookie-parser";
import users from "./routes/user.js";
import passport from "passport";
import recipes from "./routes/recipe.js";
import categories from "./routes/category.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = process.env.PORT || 5050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: ["https://tasty-book-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/user", users);
app.use("/recipe", recipes);
app.use("/category", categories);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
