import express from "express";
import Category from "../models/CategoryModel.js";
import { connectToMongoDB } from "../db/conn.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

connectToMongoDB();

// Create Category
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const newCategory = new Category({ name });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created successfully", newCategory });
  } catch (err) {
    console.error("Error creating recipe: ", err);
    res.status(500).json({ error: "Failed to create category" });
  }
});

// List all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error listing categories: ", err);
    res.status(500).json({ error: "Failed to list categories" });
  }
});

// Update category by id
router.patch("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (name) {
      category.name = name;
    }

    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (err) {
    console.error("Error updating category: ", err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete category by id
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const deletedCategory = await Category.findByIdAndRemove(id);
    if (!deletedCategory) {
      res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error delete category: ", err);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

export default router;
