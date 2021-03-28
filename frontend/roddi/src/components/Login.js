import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';
import AuthService from '../services/auth.service';
import Header from './Header';
import logo from '../images/logo_transparent.jpg'

function Login() {

  /**
   *  Helperfunction for changing the url.
   */
  const history = useHistory();
  const routeChange = () => {
    let path = '/StartPage'
    history.push(path);
  };
  const routeChangeFail = () => {
    let path = '/Login'
    history.push(path);
  }


  /**
   * Constant for storing the values the user writes into the fields on the login-page, which is used in the call we make to
   * the backend.
   */
  const [state, setState] = useState({
    username: '',
    password: '',
  });


  /**
   * Keeps track of the state, which is the data we send in our functions.
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  /**
   * Checks is the data which is written in is valid, and not null.
   * If it is valid, it executes the login function in auth-service.js with the data provided. If the data
   * corresponds with a user in the database, the routechange method takes the user to the start page. If the login is 
   * invalid, it redirects to the login page again. 
   */
  const handleSubmit = () => {
    if (
      document.getElementById('username').value == '' ||
      document.getElementById('password').value == ''
    )
      return;
    else {
      try {
        if (AuthService.login(state.username, state.password)) {
        routeChange();
      }
      } catch (error) {
        console.log(error);
        routeChangeFail();
      }
    }
  };

    
    return(
        <div className="form">
            {/* <div id="left">
            <img style={{height: "400px", width: "500px", margin: "0 0 0 8%"}} src={logo} alt="logoen"/>

                <div className="description">
                    <p>
                        Røddi er en nettside som hjelper deg å gjøre opp <strong>dødsbo</strong>
                    </p>
                </div>
            </div>
 */}
            <div id="right">
            <form>
                <div className ="welcome">
                    <label> Velkommen </label>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Brukernavn</label>
                    <input type="text" 
                        className="form-control"
                        id="username" 
                        required
                        placeholder="Skriv inn ditt brukernavn" 
                        value={state.username} 
                        onChange={handleChange}/>
                </div> 
                <div className="form-group text-left">
                    <label htmlFor="exampleUserName">Passord</label>
                    <input type="password" 
                        className="form-control" 
                        id="password"
                        required
                        placeholder="Skriv inn ditt passord"
                        value={state.password} 
                        onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-danger" onClick={handleSubmit} id="Login">Logg inn</button>
                </div>
            </form>
            </div>
        </div>
  );
}

export default Login;
