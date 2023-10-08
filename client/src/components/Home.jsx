import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {

	return (
		<>
			<div className="homeContainer">
				<div className="left">
					<h2> Find your favorite recipes</h2>
					<h5>
						The TastyBook is a cooking app that offers avariety of recipes
						coming from all around the world, suitable for all cooking skill levels.
						Recipes are created by cooking enthusiasts and shared with detailed
						instructions, ingredients and all tools needed for an exceptional
						cooking experience. Join our community of foodies and explore a world of
						delicious flavors with TastyBook.
					</h5>
					<Link to="#">
						<button onClick={() => alert('should go to /catalog')}>Take a Look!</button>
					</Link>
				</div>
				<div className="right">
					<div> <p>Recipe card</p> </div>
					<div> <p>Recipe card</p> </div>
					<div> <p>Recipe card</p> </div>
					<div> <p>Add New Recipe</p> </div>
				</div>
			</div>
		</>
	);
};

export default Home;
