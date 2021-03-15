import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../App.css';
import User from './User';
import AuthService from '../services/auth.service';
import Login from './Login';
import logo_header from '../images/logo_header.png'

function Header() {
  const history = useHistory();
  const routeChange = () => {
    let path = '/Login';
    history.push(path);
  };

  const [state, setState] = useState({
    isAdmin: false,
    currentUser: undefined,
    loggedIn: false,
  });

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
            <div  id="header_pic">
            <img style={{height: "130px", width: "250px" , margin: "0 500px 0 500px"}} src={logo_header} alt="logoen"/>
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
                </button>
                )}
                {localStorage.getItem('token') && (
                <button className="btn btn-outline-danger">
                <NavLink to="/MyEstate">MyEstate</NavLink>
                </button>
                )}
                {localStorage.getItem('token') && (
                <button className="btn btn-outline-danger">
                <NavLink to="/MyItem">MyItem</NavLink>
                </button>
                )}
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
    );
}
export default Header;
