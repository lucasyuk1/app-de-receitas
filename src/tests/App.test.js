import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('testa página de login', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitBtn = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(submitBtn);
  expect(window.location.pathname).toBe('/meals');
});
