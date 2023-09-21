import express from "express";
import Recipe from "../models/recipesModel.js";
import User from "../models/UserModel.js";
import { connectToMongoDB } from "../db/conn.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

connectToMongoDB();

// Create Recipe
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;
    const author = req.user._id; // check for verification to get id of user.
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      author,
      image,
    });

    const recipe = await newRecipe.save();

    await User.findByIdAndUpdate(
      author,
      { $push: { recipes: recipe._id } },
      { new: true }
    );
    res.status(201).json({ message: "Recipe created successfully", newRecipe });
  } catch (err) {
    console.error("Error creating recipe: ", err);
    res.status(500).json({ message: "Failed to create Recipe" });
  }
});

// View All Recipes by user._id
router.get("/", verifyToken, async (req, res) => {
  try {
    const author = req.user._id;
    const recipes = await Recipe.find({ author: author });
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error getting all the recipes: ", err);
    res.status(500).json({ error: "Error getting user recipes" });
  }
});

// Update Recipe (by id)
router.patch("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, image } = req.body;
    const author = req.user._id.toString();
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    if (recipe.author.toString() !== author) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this recipe" });
    }

    if (title) {
      recipe.title = title;
    }
    if (ingredients) {
      recipe.ingredients = ingredients;
    }
    if (instructions) {
      recipe.instructions = instructions;
    }
    if (image) {
      recipe.image = image;
    }

    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    console.error("Error updating recipe: ", err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// Delete Recipe (by id)
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user._id.toString();
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    if (recipe.author.toString() !== author) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this recipe" });
    }

    const deletedRecipe = await Recipe.findByIdAndRemove(id);
    if (!deletedRecipe) {
      res.status(404).json({ error: "Record not found" });
    }

    await User.findByIdAndUpdate(
      author,
      { $pull: { recipes: id } },
      { new: true }
    );

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe: ", err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

export default router;
