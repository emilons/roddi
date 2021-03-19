import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../App.css';
import User from './User';
import AuthService from '../services/auth.service';
import logo_header from '../images/logo_header.png'

function Header() {
  const history = useHistory();
  const routeChange = () => {
    let path = '/Login';
    history.push(path);
  };

  function logOut() {
    AuthService.logout();
    routeChange();
    window.location.reload(false);
  }

    return (
        User.name, 
        <nav className = "navbar navbar-dark" style={{fontSize:"18px"}}>
            <div  id="header_pic">
            <img src={logo_header} alt="logoen"/>
            </div>
            <div className="buttons">
                {(!localStorage.getItem('token')) && (
                <button className="btn btn-outline-danger">
                    <NavLink to="/Registrer">Registrer deg</NavLink>
                </button>
                )}
                {(!localStorage.getItem('token')) && (
                <button className="btn btn-outline-danger">
                    <NavLink to="/Login">Logg Inn</NavLink>
                </button>)}
                {localStorage.getItem('token') && localStorage.getItem('isAdmin') == "true" && (
                    <button className="btn btn-outline-danger">
                    <NavLink to="/AdminEstates">Hjem</NavLink>
                </button>
                )}
                {localStorage.getItem('token') && localStorage.getItem('isAdmin') == "false" && (
                    <button className="btn btn-outline-danger">
                    <NavLink to="/MyEstates">Hjem</NavLink>
                </button>
                )}
                {localStorage.getItem('token') && ( 
                    <button className="btn btn-outline-danger" onClick={logOut}>
                        Logg Ut
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
            </div>
        </nav>
    );
}
export default Header;
