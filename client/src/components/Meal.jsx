import React, { useState, useEffect } from "react";
import MealItem from "./MealItem";

const Meal = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/search.php?f=a");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.meals);
        setShow(true);
      });
  }, [url]);

  const searchRecipe = () => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  };

  return (
    <>
      <div className="main">
        <div className="heading">
          <h4>Recipe Card</h4>
        </div>
        <div className="searchBox">
          <input
            type="search"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchRecipe();
              }
            }}
          />
          <button className="search-button" onClick={searchRecipe}>Search</button>
        </div>
        <div className="container">
          {show ? <MealItem data={item} /> : "Not Found"}
        </div>
        <div className="indexContainer"></div>
      </div>
    </>
  );
};

export default Meal;
