import { NavLink, useHistory } from 'react-router-dom';
import '../App.css';
import User from './User';
import AuthService from '../services/auth.service';
import logo_header from '../images/logo_header.png';

/**
 * The Header component will always be present on the page, but the type of buttons showing will vary.
 * We have used JSX to render what should be available depending on what user is using the page, and what kind of "acces" they have.
 */

function Header() {
  const history = useHistory();
  const routeChange = () => {
    let path = '/Login';
    history.push(path);
  };

  /**
   * Helperfunction that excecutes the logout-function in auth-service.js
   */
  function logOut() {
    AuthService.logout();
    routeChange();
    window.location.reload(false);
  }

  return (
    /**
     * When a person registers or logs in, the backend sends information that is then stored locally on the page.
     * Depending on what the data is, the different divs underneath this comment is rendered.
     */

    User.name,
    (
      <nav className="navbar navbar-dark" style={{ fontSize: '18px' }}>
        <div id="header_pic">
          <img src={logo_header} alt="logoen" />
        </div>
        <div className="buttons">
          {!localStorage.getItem('token') && (
            <button className="btn btn-outline-danger">
              <NavLink to="/Registrer">Registrer deg</NavLink>
            </button>
          )}
          {!localStorage.getItem('token') && (
            <button className="btn btn-outline-danger">
              <NavLink to="/Login">Logg Inn</NavLink>
            </button>
          )}
          {localStorage.getItem('token') &&
            localStorage.getItem('isAdmin') == 'true' && (
              <button className="btn btn-outline-danger">
                <NavLink to="/AdminEstates">Hjem</NavLink>
              </button>
            )}
          {localStorage.getItem('token') &&
            localStorage.getItem('isAdmin') == 'false' && (
              <button className="btn btn-outline-danger">
                <NavLink to="/MyEstates">Hjem</NavLink>
              </button>
            )}
          {localStorage.getItem('token') &&
            localStorage.getItem('isAdmin') == 'true' && (
              <button className="btn btn-outline-danger">
                <NavLink to="/Statistics">Statistikk</NavLink>
              </button>
            )}
          {localStorage.getItem('token') && (
            <button className="btn btn-outline-danger" onClick={logOut}>
              Logg Ut
            </button>
          )}
        </div>
      </nav>
    )
  );
}
export default Header;
