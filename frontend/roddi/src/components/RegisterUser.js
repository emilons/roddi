import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import API from '../services/api';
import AuthService from '../services/auth.service';
import Login from './Login';

function RegisterUser(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    estates: [],
  });

  const history = useHistory();
  function routeChange() {
    let path = '/AdminEstates';
    history.push(path);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateSubmit = (e) => {
    if (
      document.getElementById('password').value ==
        document.getElementById('confirmPassword').value &&
      document.getElementById('email').value != '' &&
      document.getElementById('email').value.includes('@') &&
      document.getElementById('password').value != '' &&
      document.getElementById('name').value != ''
    ) {
      AuthService.register(state.name, state.password, state.email);
      routeChange();
    } else {
      document.getElementById('confirmPasswordHelp').innerHTML =
        'Passordene må være like!';
      document.getElementById('confirmPasswordHelp').style.color = 'red';
    }
  };
  /* Funksjonen som sender dette til databasen: 
        - Kjører et kall hvor man sjekker om verdier er tatt av andre brukere fra før.
    */

  return (
    <div className="form">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleUserName">Fullt Navn</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            placeholder="Skriv inn ditt fulle navn"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email-Adresse</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="Skriv inn din Email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Passord</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            placeholder="Velg et passord"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,55}"
            value={state.password}
            onChange={handleChange}
          />
          <small id="passwordHelp" className="form-text text-muted">
            Passordet må inneholde minst én stor og én liten bokstav, og minst
            ett tall. Minimum lengde er 6 tegn.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Bekreft Passord</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            required
            placeholder="Bekreft passordet"
            value={state.confirmPassword}
            onChange={handleChange}
          />
          <small id="confirmPasswordHelp" className="form-text"></small>
        </div>
        <button
          type="submit"
          className="btn btn-outline-danger"
          onClick={validateSubmit}
        >
          Registrer deg
        </button>
        <button
          type="submit"
          className="btn btn-outline-danger"
          id="loginDiriger"
        >
          <NavLink to="/Login"> Allerede bruker? Logg inn her.</NavLink>
        </button>
      </form>
    </div>
  );
}

export default RegisterUser;
