import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    handleCheckLogin();
  }, []);

  const handleCheckLogin = async () => {
    try {
      const response = await axios.get(
        "https://tastybook.onrender.com/user/verify",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error verifying user: ", err);
      setIsLoggedIn(false);
    }
  };

  const handleAddRecipe = () => {
    if (!isLoggedIn) {
      const confirmLogin = window.confirm("Please log in to like this recipe");
      if (confirmLogin) {
        navigate("/login");
      } else {
        alert("You must login to like the recipe!");
      }
      return;
    }
    navigate("/recipe/create");
  };

  return (
    <>
      <div className="homeContainer">
        <div className="left">
          <h2> Find your favorite recipes</h2>
          <h5>
            The TastyBook is a cooking app that offers avariety of recipes
            coming from all around the world, suitable for all cooking skill
            levels. Recipes are created by cooking enthusiasts and shared with
            detailed instructions, ingredients and all tools needed for an
            exceptional cooking experience. Join our community of foodies and
            explore a world of delicious flavors with TastyBook.
          </h5>
          <Link to="/catalog">
            <button onClick={() => navigate("/catalog")}>Take a Look!</button>
          </Link>
        </div>
        <div className="right">
          <button id="addNew" onClick={handleAddRecipe}>
            Add Your Recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
