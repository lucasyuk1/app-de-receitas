import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

export default function Header() {
  const { isVisible, setIsVisible } = useContext(AppContext);

  const location = useLocation();
  const isMealsOrDrinks = location.pathname === '/meals'
  || location.pathname === '/drinks';

  const pageTitle = location.pathname.split('/')[1];
  const regex = /-/g;
  const newStr = pageTitle.replace(regex, ' ');
  const formatedTitle = newStr
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="header-container">
      <div className="logo-btns">
        <img src="https://imgur.com/kZF2qlL.png" className="logo-app-minor" alt="logo" />
        <div className="header-btns-container">
          <Link to="/profile" className="profile-top-btn">
            <img
              src={ profileIcon }
              alt=""
              data-testid="profile-top-btn"
            />
          </Link>
          {isMealsOrDrinks && (
            <button
              className="search-top-btn"
              onClick={ () => setIsVisible(!isVisible) }
            >
              <img
                src={ searchIcon }
                alt=""
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </div>
      <h1 data-testid="page-title">{formatedTitle}</h1>
    </div>
  );
}
