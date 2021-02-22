import React, {useState, useEffect} from 'react'
import {
    NavLink,
    useHistory
  } from "react-router-dom";
import "../App.css"

import User from './User';
import AuthService from '../services/auth.service'

function Header() {

    const history = useHistory();
    const routeChange = () => {
        let path = '/Login';
        history.push(path);
    }


    const [state , setState] = useState({
    isAdmin: false,
    currentUser: undefined,
    loggedIn: false
  })

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        isAdmin: user.isAdmin,
        currentUser: user,
        loggedIn: true 
      })
    };
  })

  function logOut() {
      AuthService.logout();
      routeChange();
  }

    return (
        User.name, 
        <nav className = "navbar navbar-dark bg-dark">
            <div className ="row col-12 d-flex justify-content-center text-white">
                <span className = "Overskrift"><NavLink to="/">Røddi - Nettsiden som bla bla bla</NavLink></span>
            </div>
            <div className="buttons">
                {(!localStorage.getItem("token")) && (
                <button className="btn-secondary">
                    <NavLink to="/Registrer">Registrer deg</NavLink>
                </button>
                )}
                {(!localStorage.getItem("token")) && (
                <button className="btn-secondary">
                    <NavLink to="/Login">Logg Inn</NavLink>
                </button>)}
                {(localStorage.getItem("token")) && (
                <button className="btn-secondary">
                    <NavLink to="/AdminEstates">Admin</NavLink>
                </button>)}
                {(localStorage.getItem("token")) && (
                    <button>
                        <NavLink to="/myEstates">myEstates</NavLink>
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
                {localStorage.getItem("token") && (
                    <button onClick={logOut}>
                        <NavLink to="/Login">Logg Ut</NavLink>
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
            </div>
        </nav>
    )
}
export default Header