import React from 'react';
import '../styles/RecipeForm.css';

const RecipeForm = () => {

	return (
		<div id='rcpForm'>
		  <h2>Create your recipe</h2>
		  <form>
				<div className='row'>
					<label htmlFor="title">Title</label>
					<input
					type="text"
					id="title"
					name="title"
					/>
				</div>
				<div className='row'>
					<label htmlFor="image">Choose an image for your recipe</label>
					<input
					type="file"
					id="image"
					accept="image/*"
					/>
				</div>
				<div className='container'>
					<label>Category</label>
					<div>
						<span>
						<input
							type="checkbox"
							name='Diet1'
						/>
						Diet1
						</span>
					</div>
					<div>
						<span>
						<input
							type="checkbox"
							name='Diet2'
						/>
						Diet2
						</span>
					</div>
					<div>
						<span>
						<input
							type="checkbox"
							name='Diet3'
						/>
						Diet3
						</span>
					</div>
					<div>
						<span>
						<input
							type="checkbox"
							name='Diet4'
						/>
						Diet4
						</span>
					</div>
				</div>

				<div className='container'>
					<label htmlFor="ingredients">Ingredients</label>
					<textarea
					id="ingredients"
					name="ingredients"
					/>
				</div>

				<div className='container'>
					<label htmlFor="instructions">Instructions</label>
					<textarea
					id="instructions"
					name="instructions"
					/>
				</div>

				<button type="submit">Create Recipe</button>
		  </form>
		  <button type="button">
				Go Home
		  </button>
		</div>
	);
};

export default RecipeForm;
