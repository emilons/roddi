import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import API from '../services/api';
import AuthService from '../services/auth.service';
import Login from './Login';
import logo from '../images/logo_transparent.jpg';

function RegisterUser(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    estates: [],
  });

  /**
   * Constant for storing the values the user writes into the fields on the login-page, which is used in the call we make to
   * the backend.
   */
  const history = useHistory();
  function routeChange() {
    let path = '/Login';
    history.push(path);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  /**
   *  This function validates the different data from the inputfields.
   *  Checks if all the fields are filled out. 
   *  Checks if the password and repeated passwords are equal.
   *  Checks if the email includes an @.
   *  If all fiels are valid, we execute the register-function in auth-service.js with 
   *  the name, password, and email from the input fields. 
   */ 
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
      AuthService.logout(); //SJEKK DENNE
      
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
      {/* <div id="left">
        <img
          style={{ height: '400px', width: '500px', margin: '0 0 0 8%' }}
          src={logo}
          alt="logoen"
        />

        <div className="description">
          <p>
            Røddi er en nettside som hjelper deg å gjøre opp{' '}
            <strong>dødsbo</strong>
          </p>
        </div>
      </div> */}
      <div id="right">
        <form>
          <div className="form-group text-left">
            <label htmlFor="exampleUserName">Brukernavn</label>
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"
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
    </div>
  );
}

export default RegisterUser;
