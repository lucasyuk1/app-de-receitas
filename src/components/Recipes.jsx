import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import '../styles/Recipes.css';

export default function Recipes() {
  const { recipes, setRecipes } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [recipesByCategory, setrecipesByCategory] = useState([]);

  const location = useLocation();

  const fetchMeals = async () => {
    setRecipes([]);
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();

    if (data.meals !== null) {
      const maxArrayLength = 12;
      const updatedRecipe = data.meals.slice(0, maxArrayLength);

      setrecipesByCategory(updatedRecipe);
    }
  };

  const fetchMealsCategories = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();

    if (data.meals !== null) {
      const maxArrayLength = 5;
      const updatedCategories = data.meals.slice(0, maxArrayLength);

      setCategories(updatedCategories.map((item) => item.strCategory));
    }
  };

  const fetchDrinks = async () => {
    setRecipes([]);
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();

    if (data.drinks !== null) {
      const maxArrayLength = 12;
      const updatedRecipe = data.drinks.slice(0, maxArrayLength);

      setrecipesByCategory(updatedRecipe);
    }
  };

  const fetchDrinksCategories = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();

    if (data.drinks !== null) {
      const maxArrayLength = 5;
      const updatedCategories = data.drinks.slice(0, maxArrayLength);

      setCategories(updatedCategories.map((item) => item.strCategory));
    }
  };

  const fetchByFilter = () => {
    if (location.pathname === '/meals') {
      fetchMeals();
      fetchMealsCategories();
    }
    if (location.pathname === '/drinks') {
      fetchDrinks();
      fetchDrinksCategories();
    }
  };

  const fetchByCategory = async (category) => {
    setRecipes([]);
    let url = '';
    if (location.pathname === '/meals') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    if (location.pathname === '/drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (data.meals !== null && location.pathname === '/meals') {
      const maxArrayLength = 12;
      const updatedRecipe = data.meals.slice(0, maxArrayLength);

      setrecipesByCategory(updatedRecipe);
      return;
    }

    if (data.drinks !== null && location.pathname === '/drinks') {
      const maxArrayLength = 12;
      const updatedRecipe = data.drinks.slice(0, maxArrayLength);

      setrecipesByCategory(updatedRecipe);
    }
  };

  const updatedRecipe = recipes.length > 0 ? recipes : recipesByCategory;

  useEffect(() => {
    fetchByFilter();
  }, []);

  return (
    <div>
      <div className="top-container">
        <button
          data-testid="All-category-filter"
          className="all-category-button"
          onClick={ () => fetchByFilter() }
        >
          All
        </button>
        <div className="categories-buttons-container">
          {categories.map((item, index) => (
            <button
              value={ item }
              onClick={ ({ target }) => fetchByCategory(target.value) }
              key={ index }
              className="category-button"
              data-testid={ `${item}-category-filter` }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="recipes-container">
        <div className="recipes">
          { location.pathname === '/meals'
            ? updatedRecipe.map((recipe, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className="recipe-card"
              >
                <Link to={ `/meals/${recipe.idMeal}` }>
                  <img
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${index}-card-img` }
                    className="recipe-image"
                  />
                  <h4
                    data-testid={ `${index}-card-name` }
                    className="recipe-name"
                  >
                    {recipe.strMeal}

                  </h4>
                </Link>
              </div>
            ))
            : updatedRecipe.map((recipe, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className="recipe-card"
              >
                <Link to={ `/drinks/${recipe.idDrink}` }>
                  <img
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                    className="recipe-image"
                  />
                  <h4
                    data-testid={ `${index}-card-name` }
                    className="recipe-name"
                  >
                    {recipe.strDrink}

                  </h4>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
