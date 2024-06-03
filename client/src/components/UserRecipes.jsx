import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRecipeCard from "./UserRecipeCard";
import styles from "../styles/UserRecipes.module.css";

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get("https://tastybook.onrender.com/recipe/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserRecipes(response.data);
        } else {
          alert("Failed to fetch user recipes");
        }
      } catch (err) {
        console.error("Error: ", err);
        alert("An error occurred while fetching user recipes");
      }
    };
    fetchUserRecipes();
  }, []);
  return (
    <div className={styles.userRecipesContainer}>
      {/* <h2>Your Recipes</h2> */}
      <ul>
        {userRecipes.map((recipe) => (
          <UserRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
