import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import bHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../styles/Recipes.css';

export default function FavoriteRecipes() {
  const heartIcon = bHeartIcon;
  const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(storedFavoriteRecipes);
  const filterMeals = () => {
    const newRecipes = storedFavoriteRecipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(newRecipes);
  };
  const filterDrinks = () => {
    const newRecipes = storedFavoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(newRecipes);
  };
  const removeFavorite = (id) => {
    const newFavorites = filteredRecipes.filter((receipe) => receipe.id !== id);
    setFilteredRecipes(newFavorites);
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  return (
    <div className="recipes-favorite-container">
      <Header />
      <div className="filter-btns-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="filter-by-all-btn"
          onClick={ () => setFilteredRecipes(storedFavoriteRecipes) }
          name="all"
        >
          <img src="https://imgur.com/ljaZ0hF.png" alt="all" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="filter-by-meal-btn"
          onClick={ filterMeals }
          name="meals"
        >
          <img src="https://imgur.com/Ew5XjE0.png" alt="all" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="filter-by-drink-btn"
          onClick={ filterDrinks }
          name="drinks"
        >
          <img src="https://imgur.com/dVV6nVo.png" alt="all" />
        </button>
      </div>
      {
        filteredRecipes?.map((recipe, index) => {
          const {
            tags,
            category,
            name, image, doneDate, nationality, alcoholicOrNot, id, type } = recipe;
          return (
            <FavoriteCard
              key={ name }
              tags={ tags }
              category={ category }
              name={ name }
              image={ image }
              doneDate={ doneDate }
              index={ index }
              nationality={ nationality }
              alcoholicOrNot={ alcoholicOrNot }
              id={ id }
              type={ type }
              heartIcon={ heartIcon }
              removeFavorite={ removeFavorite }
            />
          );
        })
      }
    </div>
  );
}
