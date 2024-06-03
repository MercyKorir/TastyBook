import React, { useEffect, useState } from "react";
import EditRecipe from "./EditRecipe";
import axios from "axios";
import { useCookies } from "react-cookie";
import styles from "../styles/UserRecipeCard.module.css";

const UserRecipeCard = ({ recipe }) => {
  const [cookies, ,] = useCookies(["token"]);
  const [isEditing, setIsEditing] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleEditStart = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleEditDone = () => {
    setIsEditing(false);
  };

  const handleDeleteRecipe = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      console.log(recipe._id);
      try {
        const response = await axios.delete(
          `https://tastybook.onrender.com/recipe/delete/${recipe._id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          window.location.reload();
          alert("Successfully deleted!");
        } else {
          alert("Error deleting recipe");
          console.error("Error deleting recipe");
        }
      } catch (err) {
        console.error("Error deleting recipe: ", err);
      }
    }
  };

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const response = await axios.get(
          `https://tastybook.onrender.com/recipe/likes/${recipe._id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setLikesCount(response.data.likesCount);
        } else {
          console.error("Error fetching like count");
        }
      } catch (err) {
        console.error("Error fetching likes count: ", err);
      }
    };

    fetchLikesCount();

    const interval = setInterval(fetchLikesCount, 3000);

    return () => clearInterval(interval);
  }, [recipe._id]);

  return (
    <div>
      {isEditing ? (
        <EditRecipe recipe={recipe} onEditDone={handleEditDone} />
      ) : (
        <div className={styles.userRecipe}>
          <h2>{recipe.title}</h2>
          <img
            src={`https://tastybook.onrender.com/${recipe.image}`}
            className={styles.img}
            alt={recipe.title}
          />
          <div className={styles.container}>
            <h3>Ingredients</h3>
            <p className={styles.contP}>{recipe.ingredients}</p>
          </div>
          <div className={styles.container}>
            <h3>Instructions</h3>
            <p className={styles.contP}>{recipe.instructions}</p>
          </div>
          <div className={styles.bottom}>
            <p className={styles.botP}>
              Likes: <span className={styles.botSpan}>{likesCount}</span>
            </p>
            <button
              type="button"
              onClick={handleEditStart}
              className={styles.btn}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteRecipe}
              className={styles.btn}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecipeCard;
