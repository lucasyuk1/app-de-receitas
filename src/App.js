import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import MealDetails from './pages/MealDetails';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/meals"
          component={ Meals }
        />
        <Route
          path="/meals/:id"
          component={ MealDetails }
        />
        <Route
          path="/drinks"
          component={ Drinks }
        />
        <Route
          path="/drinks/:id"
          component={ DrinkDetails }
        />
        <Route
          path="/meals/:id/in-progress"
        />
        <Route
          path="/drinks/:id/in-progress"
        />
        <Route
          path="/profile"
          component={ Profile }
        />
        <Route
          path="/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
      </Switch>
    </div>
  );
}

export default App;
