import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/RecipeForm.css";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["token"]);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
    categoryNames: [],
  });
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setSelectedImage(file);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        categoryNames: [...formData.categoryNames, name],
      });
    } else {
      setFormData({
        ...formData,
        categoryNames: formData.categoryNames.filter(
          (category) => category !== name
        ),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tastybook.onrender.com/recipe/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Recipe created successfully");
        setFormData({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
          categoryNames: [],
        });
        setSelectedImage(null);
      } else {
        alert("Recipe creation failed");
      }
    } catch (err) {
      console.error("Error creating recipe(client): ", err);
      alert("An error occurred while creating the recipe.");
    }
  };

  const handleGoHome = (e) => {
    e.preventDefault();

    navigate("/");
  };

  useEffect(() => {
    axios
      .get("https://tastybook.onrender.com/user/verify", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === true) {
          const user = response.data.user;
          console.log(`Welcome ${user.username}`);
        } else {
          alert("Login to Continue");
          console.error("User is not authorized");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        navigate("/");
      });

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
  }, [navigate, cookies.token]);

  return (
    <div className="recipeFormContainer">
      <div id="rcpForm">
        <h2>Create your recipe</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="image">Choose an image for your recipe</label>
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
                    checked={formData.categoryNames.includes(category.name)}
                    onChange={handleCategoryChange}
                  />
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          <div className="container">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="container">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Recipe</button>
        </form>
        <button type="button" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;
