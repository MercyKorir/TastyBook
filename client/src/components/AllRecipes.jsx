import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRecipeCard from "./AllRecipeCard";
import styles from "../styles/AllRecipes.module.css";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://tasty-book-api.vercel.app/recipe/all", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          setRecipes(response.data);
        } else {
          alert("Failed to fetch all recipes");
        }
      } catch (err) {
        console.error("Error: ", err);
        alert("An error occurred while fetching all recipes");
      }
    };

    fetchRecipes();
  }, []);
  return (
    <div className={styles.allRecipesContainer}>
      <ul>
        {recipes.map((recipe) => (
          <AllRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default AllRecipes;
