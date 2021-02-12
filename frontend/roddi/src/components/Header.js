import React from 'react'
import {
    NavLink,
  } from "react-router-dom";
import "../App.css"

function Header() {
    return (
        <nav className = "navbar navbar-dark bg-dark">
            <div className ="row col-12 d-flex justify-content-center text-white">
                <span className = "Overskrift"><NavLink to="/">Røddi - Nettsiden som bla bla bla</NavLink></span>
            </div>
            <div className="buttons">
                <button className="btn-secondary">
                    <NavLink to="/Registrer">Registrer deg</NavLink>
                </button>
                <button className="btn-secondary">
                    <NavLink to="/Login">Logg Inn</NavLink>
                </button>
            </div>
        </nav>
    )
}
export default Header