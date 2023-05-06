import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const values = useMemo(() => ({
    recipes,
    setRecipes,
    isVisible,
    setIsVisible,
  }), [recipes, setRecipes, isVisible]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
