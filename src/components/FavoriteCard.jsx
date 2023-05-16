import React from 'react';
import { Link } from 'react-router-dom';
import CopyBtn from './CopyBtn';
import '../styles/Recipes.css';

export default function FavoriteRecipeCard(favoriteRecipes) {
  const { name, category, doneDate, index,
    heartIcon,
    removeFavorite,
    image, nationality, alcoholicOrNot, id, type } = favoriteRecipes;
  const pathname = (type === 'meal' ? 'meals' : 'drinks');

  return (
    <div className="favorite-recipes">
      <div className="favorite-recipes-img">
        <Link to={ `${pathname}/${id}` }>
          <img
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      <div className="favorite-recipes-text">
        <Link to={ `${pathname}/${id}` }>
          <p data-testid={ `${index}-horizontal-name` } className="favorite-title">
            { name }
          </p>
        </Link>
        {
          nationality
            ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="nat-cat-title"
              >
                { `${nationality} - ${category}` }
              </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` } className="nat-cat-title">
                { category }
              </p>
            )
        }
        {
          alcoholicOrNot === 'Alcoholic'
        && (
          <p data-testid={ `${index}-horizontal-top-text` } className="nat-cat-title">
            { alcoholicOrNot }
          </p>)
        }
        <p data-testid={ `${index}-horizontal-done-date` } className="nat-cat-title">
          { doneDate }
        </p>

        <div className="share-fav-btns">
          <CopyBtn
            id={ id }
            type={ type }
            dataTest={ `${index}-horizontal-share-btn` }
          />
          <button
            type="button"
            src={ heartIcon }
            className="favorite-btn"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(id) }
          >
            <img src={ heartIcon } alt="Favorite" />
          </button>
        </div>
      </div>
    </div>
  );
}
