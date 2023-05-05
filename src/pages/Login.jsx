import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const minPasswordLength = 6;
  const isValidPassword = password.length > minPasswordLength;
  const disabled = !(isValidEmail && isValidPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
