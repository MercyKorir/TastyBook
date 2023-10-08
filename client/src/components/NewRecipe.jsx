import React from 'react';
import '../styles/NewRecipe.css'
import imageUrl from '../assets/icons8-meal-96.png';

const NewRecipe = () => {

	return (
		<div className='recipeForm'>
			<div>
				<img src={imageUrl} alt="Some stuff" />
			</div>
		</div>
	);
};
export default NewRecipe;
