import express from "express";
import Recipe from "../models/recipesModel.js";
import User from "../models/UserModel.js";
import { connectToMongoDB } from "../db/conn.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import Category from "../models/CategoryModel.js";

const router = express.Router();

connectToMongoDB();

// Create Recipe
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, ingredients, instructions, image, categoryNames } = req.body;
    const author = req.user._id; // check for verification to get id of user.

    if (!title || !ingredients || !instructions || !image || !categoryNames) {
      return res.status(400).json({
        error: "Failed to create recipe",
        message: "Please provide all required fields",
      });
    }

    if (!categoryNames.length) {
      return res.status(400).json({
        error: "Failed to create recipe",
        message: "Please select at least one category",
      });
    }

    const existingCategories = await Category.find({
      name: { $in: categoryNames },
    });

    if (existingCategories.length !== categoryNames.length) {
      const nonExistCategories = categoryNames.filter(
        (name) => !existingCategories.find((category) => category.name === name)
      );
      return res.status(400).json({
        error: "Failed to create recipe",
        message: `The following categories do not exist: ${nonExistCategories.join(
          ", "
        )}. Please choose from available categories.`,
        availableCategories:
          "Appetizers, Desserts,Salads,Main Course,Side Dish,Beverage,Lunch,Breakfast,Baking,Vegetarian,Grilling and BBQ,Kid-friendly,Quick and Easy,Budget-friendly,Left-overs,Dairy-Free,International Cuisine,Soups and Stews,Sauces and Gravies",
      });
    }

    const categories = existingCategories.map((category) => category._id);

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      author,
      image,
      categories,
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

// View All Recipes available
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error getting all recipes: ", err);
    res
      .status(500)
      .json({ error: "Error fetching all the recipes from database!" });
  }
  const recipes = await Recipe.find();
});

// Update Recipe (by id)
router.patch("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, image, categoryNames } = req.body;
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

    let categories;

    if (categoryNames && categoryNames.length > 0) {
      const existingCategories = await Category.find({
        name: { $in: categoryNames },
      });

      if (existingCategories.length !== categoryNames.length) {
        const nonExistCategories = categoryNames.filter(
          (name) =>
            !existingCategories.find((category) => category.name === name)
        );
        return res.status(400).json({
          error: "Failed to update recipe",
          message: `The following categories do not exist: ${nonExistCategories.join(
            ", "
          )}. Please choose from available categories.`,
          availableCategories:
            "Appetizers, Desserts,Salads,Main Course,Side Dish,Beverage,Lunch,Breakfast,Baking,Vegetarian,Grilling and BBQ,Kid-friendly,Quick and Easy,Budget-friendly,Left-overs,Dairy-Free,International Cuisine,Soups and Stews,Sauces and Gravies",
        });
      }
      categories = existingCategories.map((category) => category._id);
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
    if (categories) {
      recipe.categories = categories;
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

// Like a Recipe
router.post("/like/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.likes.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already liked this recipe" });
    }

    recipe.likes.push(userId);
    await recipe.save();

    res.status(200).json({ message: "Recipe liked successfully" });
  } catch (err) {
    console.error("Error liking recipe: ", err);
    res.status(500).json({ error: "Failed to like recipe" });
  }
});

// Unlike a Recipe
router.post("/unlike/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    if (!recipe.likes.includes(userId)) {
      return res.status(400).json({ error: "You have not liked this recipe" });
    }

    recipe.likes = recipe.likes.filter(
      (likeId) => likeId.toString() !== userId.toString()
    );
    await recipe.save();

    res.status(200).json({ message: "Recipe unliked successfully" });
  } catch (err) {
    console.error("Error unliking recipe: ", err);
    res.status(500).json({ error: "Failed to unlike recipe" });
  }
});

// Check if user has liked recipe
router.get("/user-like/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const userLiked = recipe.likes.includes(userId);

    res.status(200).json({ userLiked });
  } catch (err) {
    console.error("Error checking the user like status: ", err);
    res.status(500).json({ error: "Failed to check like status" });
  }
});

// Get all likes for recipe
router.get("/likes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const likesCount = recipe.likes.length;
    res.status(200).json({ likesCount });
  } catch (err) {
    console.error("Error getting likes count: ", err);
    res.status(500).json({ error: "Failed to get likes count" });
  }
});

export default router;
