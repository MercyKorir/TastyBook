import React from'react';
import '../styles/AllRecipeCard.css';
import food from '../assets/egg_img.jpg';
import like from '../assets/icons8-like.gif';
import dislike from '../assets/icons8-dislike.png'

const AllRecipeCard = () => {

  return (
    <div id='viewRecipe'>
      <h2>Deviled Eggs</h2>
      <img src={food} alt='deviled_egg' />
      <div className='container'>
        <h3>Ingredients</h3>
        <p>
          12 large eggs
          2 teaspoons Dijon mustard
          1/3 cup mayonnaise
          1 tablespoon minced shallot or onion
          1/4 teaspoon Tabasco sauce
          Kosher salt and freshly ground black pepper, to taste
          Paprika, to taste
        </p>
      </div>
      <div className='container'>
        <h3>Instructions</h3>
        <p>
          Fill a saucepan with an inch of water and insert a steamer basket. Bring the water to a boil
          and place the eggs in the steamer basket. (If you don't have a steamer basket, you can just
          place the eggs directly in about 3/4 inch of water.) Cover the pan and let the eggs steam
          from the boiling water for 17 minutes for 12 large eggs, or 15 minutes for 6 large eggs.
          Reduce cooking time by a couple minutes if using regular size (not large) eggs. Then shock
          with cold water and peel.
        </p>
      </div>
      <div id='bottom'>
        <p>Likes: <span>123</span></p>
        <img src={like} alt="like" title='like' onClick={() => alert('liked!')}/>
        <img src={dislike} alt="dislike" title='dislike' onClick={() => alert('disliked!')}/>
        {/* <button type="button">
          Like
        </button> */}
      </div>
    </div>
  );
};

export default AllRecipeCard;
