import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const recipeID = location.pathname.split('/')[2];
  const pathname = location.pathname.split('/')[1];

  const fetchRecommendations = async () => {
    if (pathname === 'meals') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      if (data.drinks !== null) {
        const maxArrayLength = 6;
        const updatedRecommendation = data.drinks.slice(0, maxArrayLength);
        setRecommendations(updatedRecommendation);
      }
    }

    if (pathname === 'drinks') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      if (data.meals !== null) {
        const maxArrayLength = 6;
        const updatedRecommendation = data.meals.slice(0, maxArrayLength);
        setRecommendations(updatedRecommendation);
      }
    }
  };

  const fetchByID = async () => {
    if (pathname === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);

      const getIngredients = Object.keys(data.meals[0]).filter((item) => (
        item.includes('strIngredient')
              && data.meals[0][item] !== null && data.meals[0][item] !== ''
      ));
      setIngredients(getIngredients);

      fetchRecommendations();

      return;
    }

    if (pathname === 'drinks') {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
      const data = await request.json();
      setRecipe(data.drinks);

      const getIngredients = Object.keys(data.drinks[0]).filter((item) => (
        item.includes('strIngredient')
              && data.drinks[0][item] !== null && data.drinks[0][item] !== ''
      ));
      setIngredients(getIngredients);

      fetchRecommendations();
    }
  };

  useEffect(() => {
    fetchByID();
  }, []);

  return (
    <div>
      { pathname === 'meals'
        ? recipe.map((item, index) => (
          <div key={ index }>
            <button data-testid="share-btn">
              <img src={ shareIcon } alt="" />
            </button>
            <button data-testid="favorite-btn">
              <img src={ favoriteIcon } alt="" />
            </button>
            <img src={ item.strMealThumb } alt="" data-testid="recipe-photo" />
            <h4 data-testid="recipe-title">{item.strMeal}</h4>
            <p data-testid="recipe-category">{item.strCategory}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            {ingredients.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {item[ingredient]}
                {' '}
                -
                {' '}
                {item[`strMeasure${i + 1}`]}
              </p>
            ))}
            {item.strYoutube && (
              <iframe
                data-testid="video"
                width="320"
                height="240"
                src={ item.strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                allowFullScreen
              />
            )}
            <div className={ styles.recommendation }>
              {recommendations.map((recommendation, i) => (
                <div key={ i } data-testid={ `${i}-recommendation-card` }>
                  <img
                    src={ recommendation.strDrinkThumb }
                    alt=""
                  />
                  <p data-testid={ `${i}-recommendation-title` }>
                    { recommendation.strDrink }
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid="start-recipe-btn"
              className={ styles.startRecipeBtn }
            >
              Start Recipe
            </button>
          </div>
        )) : recipe.map((item, index) => (
          <div key={ index }>
            <button data-testid="share-btn">
              <img src={ shareIcon } alt="" />
            </button>
            <button data-testid="favorite-btn">
              <img src={ favoriteIcon } alt="" />
            </button>
            <img src={ item.strDrinkThumb } alt="" data-testid="recipe-photo" />
            <h4 data-testid="recipe-title">{item.strDrink}</h4>
            <span data-testid="recipe-category">
              {item.strCategory}
              {' '}
              -
              {' '}
              {item.strAlcoholic}
            </span>
            <p data-testid="instructions">{item.strInstructions}</p>
            {ingredients.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {item[ingredient]}
                {' '}
                -
                {' '}
                {item[`strMeasure${i + 1}`]}
              </p>
            ))}
            <div className={ styles.recommendation }>
              {recommendations.map((recommendation, i) => (
                <div
                  key={ i }
                  data-testid={ `${i}-recommendation-card` }
                >
                  <img
                    src={ recommendation.strMealThumb }
                    alt=""
                  />
                  <p data-testid={ `${i}-recommendation-title` }>
                    { recommendation.strMeal }
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid="start-recipe-btn"
              className={ styles.startRecipeBtn }
            >
              Start Recipe
            </button>
          </div>
        ))}
    </div>
  );
}
