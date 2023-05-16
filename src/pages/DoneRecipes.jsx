import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneFood, setDoneFood] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    setDoneFood(doneRecipes);
  }, []);

  const shareLink = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(!linkCopied);
  };

  const filterDoneRecipes = (filter) => {
    if (filter === 'all') return setDoneFood(doneRecipes);
    const filterType = doneRecipes.filter((recipes) => recipes.type === filter);
    setDoneFood(filterType);
  };

  return (
    <div className="recipes-favorite-container">
      <Header
        title="Done Recipes"
        enableSearchIcon={ false }
      />
      <div className="filter-btns-container">
        <button
          onClick={ () => filterDoneRecipes('all') }
          data-testid="filter-by-all-btn"
          className="filter-by-all-btn"
        >
          <img src="https://imgur.com/ljaZ0hF.png" alt="all" />
        </button>
        <button
          onClick={ () => filterDoneRecipes('meal') }
          data-testid="filter-by-meal-btn"
          className="filter-by-meal-btn"
        >
          <img src="https://imgur.com/Ew5XjE0.png" alt="all" />
        </button>
        <button
          onClick={ () => filterDoneRecipes('drink') }
          data-testid="filter-by-drink-btn"
          className="filter-by-drink-btn"
        >
          <img src="https://imgur.com/dVV6nVo.png" alt="all" />
        </button>
      </div>
      {linkCopied && <p>Link copied!</p>}
      {doneFood.length !== 0 && doneFood.map((recipe, index) => {
        if (recipe.type === 'meal') {
          return (
            <div key={ index } className="favorite-recipes">
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  style={ { width: '180px' } }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="favorite-recipes-text">
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  className="favorite-title"
                >
                  { recipe.name }
                </h2>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="nat-cat-title"
                >
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="nat-cat-title"
                >
                  { recipe.doneDate}

                </p>
                <button
                  onClick={ () => shareLink(recipe.id, recipe.type) }
                  className="favorite-btn"
                >
                  <img
                    src={ shareIcon }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                {recipe.tags.map((tag, indice) => {
                  if (indice < 2) {
                    return (
                      <p
                        key={ `${tag}${index}` }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }

                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        }
        return (
          <div key={ index } className="favorite-recipes">
            <a href={ `${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '180px' } }
                data-testid={ `${index}-horizontal-image` }
              />
            </a>
            <div className="favorite-recipes-text">
              <h2
                data-testid={ `${index}-horizontal-name` }
                className="favorite-title"
              >
                { recipe.name }

              </h2>
              <p data-testid={ `${index}-horizontal-top-text` } className="nat-cat-title">
                { recipe.alcoholicOrNot }
                {' '}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="nat-cat-title"
              >
                { recipe.doneDate }

              </p>
              <button
                onClick={ () => shareLink() }
                className="favorite-btn"
              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
