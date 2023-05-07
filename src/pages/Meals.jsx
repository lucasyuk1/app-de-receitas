import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Recipes />
      <Footer />
    </div>
  );
}
