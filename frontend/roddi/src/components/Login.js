import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';
import AuthService from '../services/auth.service';
import Header from './Header';

function Login(props) {
  const history = useHistory();
  const routeChange = () => {
    let path = '/AdminEstates';
    history.push(path);
  };

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(state);
    if (
      document.getElementById('username').value == '' ||
      document.getElementById('password').value == ''
    )
      return;
    else {
      if (AuthService.login(state.username, state.password)) {
        routeChange();
      }
    }
  };

  return (
    <div className="form">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleUserName">Navn</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            placeholder="Skriv inn ditt navn"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleUserName">Passord</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            placeholder="Skriv inn ditt passord"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-outline-danger"
            onClick={handleSubmit}
            id="Login"
          >
            Logg inn
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
