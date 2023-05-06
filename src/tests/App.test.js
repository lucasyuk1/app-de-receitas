import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import App from '../App';

test('testa página de login', () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitBtn = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(submitBtn);
  expect(window.location.pathname).toBe('/meals');
});

test('testa barra de busca', async () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>,
  );

  expect(window.location.pathname).toBe('/meals');

  screen.getByRole('heading', {
    name: /meals/i,
  });

  const searchIcon = screen.getByTestId('search-top-btn');
  userEvent.click(searchIcon);
  const searchInput = screen.getByTestId('search-input');
  const searchBtn = screen.getByTestId('exec-search-btn');

  screen.getByRole('radio', {
    name: /ingredient/i,
  });

  const nameBtn = screen.getByRole('radio', {
    name: /name/i,
  });

  screen.getByRole('radio', {
    name: /first letter/i,
  });

  userEvent.type(searchInput, 'Brown Stew Chicken');
  userEvent.click(nameBtn);
  userEvent.click(searchBtn);

  setTimeout(() => {
    expect(window.location.pathname).toBe('/meals/52940');
  }, 1000);

  const profileBtn = screen.getByTestId('profile-top-btn');
  userEvent.click(profileBtn);

  setTimeout(() => {
    expect(window.location.pathname).toBe('/profile');
  }, 1000);
});

test('Testa se aparece global alert se for digitado mais de 1 letra', async () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>,
  );

  const history = createMemoryHistory();
  history.push('/meals');

  setTimeout(() => {
    expect(window.location.pathname).toBe('/meals');
  }, 1000);

  setTimeout(() => {
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'teste');

    const inputRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputRadio);

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
  }, 1000);
});
