import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth-action';

export const Login = ({ login, history }) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [disabled, setDisabled] = useState(true);
  let [error, setError] = useState('');

  useEffect(() => {
    if (username.length > 2 && password.length > 2) {
      setDisabled(false);
    }
  }, [username, password]);

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        id="form-login"
        className="bg-gray-500 flex flex-col w-1/2 rounded-lg shadow-lg p-3"
        onSubmit={e => {
          login({ username, password })
            .then(() => {
              history.push('/products');
            })
            .catch(error => {
              setError(error.message);
            });

          e.preventDefault();
        }}
      >
        <input
          id="text-username"
          className="text-xl p-4 rounded"
          type="text"
          value={username}
          placeholder="Username"
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <input
          id="text-password"
          className="text-xl p-4 mt-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        {error && <span id="error-message">{error}</span>}
        <button
          type="submit"
          className="w-full text-white bg-blue-300 p-4 mt-4 rounded"
          id="button-login"
          disabled={disabled}
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  login
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Login);
