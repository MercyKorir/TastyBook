import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/AllRecipeCard.css";
import like from "../assets/icons8-like.gif";
import dislike from "../assets/icons8-dislike.png";

const AllRecipeCard = ({ recipe }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [cookies, ,] = useCookies(["token"]);
  const navigate = useNavigate();

  const isLoggedIn = !!cookies.token;

  useEffect(() => {
    console.log("Cookies at component mount: ", cookies);
  }, [cookies])

  const handleLike = async () => {
    console.log("Cookies on like: ", cookies);
    if (!isLoggedIn) {
      const confirmLogin = window.confirm("Please log in to like this recipe");
      if (confirmLogin) {
        navigate("/");
      } else {
        alert("You must login to like the recipe!");
      }
      return;
    }
    try {
      const response = await axios.post(
        `https://tastybook.onrender.com/recipe/like/${recipe._id}`,
        null,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Liked recipe successfully");
        setIsLiked(true);
      } else {
        console.error("Error liking recipe");
      }
    } catch (err) {
      console.error("Error liking recipe: ", err);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.post(
        `https://tastybook.onrender.com/recipe/unlike/${recipe._id}`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Unliked recipe successfully");
        setIsLiked(false);
      } else {
        console.error("Error unliking recipe");
      }
    } catch (err) {
      console.error("Error unliking recipe: ", err);
    }
  };

  useEffect(() => {
    console.log("Cookies at component mount: ", cookies);
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

    const fetchUserLikeStatus = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        const response = await axios.get(
          `https://tastybook.onrender.com/recipe/user-like/${recipe._id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsLiked(response.data.userLiked);
        } else {
          console.error("Error fetching user like status");
        }
      } catch (err) {
        console.error("Error fetching user like status: ", err);
      }
    };

    fetchUserLikeStatus();

    const interval = setInterval(fetchLikesCount, 3000);

    return () => clearInterval(interval);
  }, [recipe._id, isLoggedIn, cookies]);

  return (
    <div id="viewRecipe">
      <img
        src={`https://tastybook.onrender.com/${recipe.image}`}
        alt={recipe.title}
        className="recipeImg"
      />
      <h2>{recipe.title}</h2>
      <div className="container">
        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>
      </div>
      <div className="container">
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <div id="bottom">
        <p>
          Likes: <span>{likesCount}</span>
        </p>
        {isLiked ? (
          <img
            src={dislike}
            alt="dislike"
            title="dislike"
            onClick={handleUnlike}
          />
        ) : (
          <img src={like} alt="like" title="like" onClick={handleLike} />
        )}
      </div>
    </div>
  );
};

export default AllRecipeCard;
