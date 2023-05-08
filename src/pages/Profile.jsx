import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : '';

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{email}</p>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          onClick={ () => localStorage.clear() }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}
