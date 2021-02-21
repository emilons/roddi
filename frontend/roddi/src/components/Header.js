import React, {useState, useEffect} from 'react'
import {
    NavLink,
  } from "react-router-dom";
import "../App.css"

import User from './User';
import AuthService from '../services/auth.service'

function Header() {

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
  }

    return (
        User.name, 
        <nav className = "navbar navbar-dark bg-dark">
            <div className ="row col-12 d-flex justify-content-center text-white">
                <span className = "Overskrift"><NavLink to="/">Røddi - Nettsiden som bla bla bla</NavLink></span>
            </div>
            <div className="buttons">
                {(!state.loggedIn) && (
                <button className="btn-secondary">
                    <NavLink to="/Registrer">Registrer deg</NavLink>
                </button>
                )}
                {(!state.loggedIn) && (
                <button className="btn-secondary">
                    <NavLink to="/Login">Logg Inn</NavLink>
                </button>)}
                <button className="btn-secondary">
                    <NavLink to="/AdminEstates">Admin</NavLink>
                </button>
                {state.currentUser && (
                    <button>
                        myEstate
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
                {state.loggedIn && (
                    <button>
                        Logg Ut
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
            </div>
        </nav>
    )
}
export default Header