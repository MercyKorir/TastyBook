import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RecipeForm.css";

const EditRecipe = ({ recipe, onEditDone }) => {
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    image: recipe.image,
    categoryNames: recipe.categories.map((category) => category.name),
  });

  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch the list of categories
    axios
      .get("https://tastybook.onrender.com/category/all", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.error("Error fetching categories: ", err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedRecipe({ ...editedRecipe, image: file });
    setSelectedImage(file);
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setEditedRecipe({
        ...editedRecipe,
        categoryNames: [...editedRecipe.categoryNames, name],
      });
    } else {
      setEditedRecipe({
        ...editedRecipe,
        categoryNames: editedRecipe.categoryNames.filter(
          (category) => category !== name
        ),
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `https://tastybook.onrender.com/recipe/update/${recipe._id}`,
        editedRecipe,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSelectedImage(null);
        setInterval(() => {
          onEditDone();
        }, 2000);
      } else {
        alert("Failed to update recipe");
        console.error("Error updating recipe");
      }
    } catch (err) {
      console.error("Error updating the recipe: ", err);
    }
  };

  return (
    <div id="rcpForm">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedRecipe.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="image">Image URL:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {selectedImage && (
          <div className="row">
            <label>Selected Image Preview:</label>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Recipe"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}

        <div className="container">
          <label>Category</label>
          {categories.map((category) => (
            <div key={category._id}>
              <span>
                <input
                  type="checkbox"
                  name={category.name}
                  checked={editedRecipe.categoryNames.includes(category.name)}
                  onChange={handleCategoryChange}
                />
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="container">
          <div className="row">
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              id="instructions"
              name="instructions"
              value={editedRecipe.instructions}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={editedRecipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRecipe;
