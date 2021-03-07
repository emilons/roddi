import React, {useState, useEffect} from 'react'
import {
    NavLink,
    useHistory
  } from "react-router-dom";
import "../App.css"
import User from './User';
import AuthService from '../services/auth.service'
import Login from './Login';

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
  const history = useHistory();
  const routeChange = () => {
      let path = '/Login';
      history.push(path);
  }


/*
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        isAdmin: user.isAdmin,
        currentUser: user,
        loggedIn: true 
      })
    };
  })*/

  function logOut(props) {
      AuthService.logout();
      routeChange();
      window.location.reload(false);
  }

/*  function logIn() {
        routeChange("/AdminEstates");
        this.setState({
            isAdmin: true,
            currentUser: undefined,
            loggedIn: true
    })

}
*/
    return (
        User.name, 
        <nav className = "navbar navbar-dark" style={{fontSize:"18px"}}>
            <div className ="row col-12 d-flex justify-content-center text-white" style={{fontSize:"50px", fontFamily:"Comic Sans MS"}}>
                <span className = "Overskrift"><NavLink to="/">Røddi</NavLink></span>
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
                {localStorage.getItem('token') && (
                    <button className="btn btn-outline-danger">
                    <NavLink to="/AdminEstates">Admin</NavLink>
                </button>
                )}
                {localStorage.getItem('token') && (
                <button className="btn btn-outline-danger">
                <NavLink to="/AdminEstatePage">AdminEstate</NavLink>
            </button>)}
                {state.currentUser && (
                    <button>
                        MyEstate
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
                {localStorage.getItem('token') && (
                    <button className="btn btn-outline-danger" onClick={logOut}>
                        Logg Ut
                    </button> //Legger inn en NavLink etterhvert som vi lager sidene og finner path.
                )}
            </div>
        </nav>
    )
}
export default Header