import './App.css';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login';
import Header from "./components/Header"
import RegisterUser from "./components/RegisterUser";
import AdminEstates from "./components/AdminEstates";
import myEstate from './components/myEstate';
import AuthService from "./services/auth.service";
import { Component, useEffect } from 'react';

function logOut() {
  AuthService.logout();
}

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: localStorage.getItem('token') ? true : false,
        currentUser: '',
        isAdmin: false
      };
    }
  

  render() {


    return (
      <HashRouter>
        <div className="Header">
          <Header />
        </div>
        <div className="App">
          <Route path="/Registrer" component={RegisterUser} />
          <Route path="/Login" component={Login} />
          <Route path="/AdminEstates" component={AdminEstates} />
          <Route path="/myEstates" component={myEstate} />
          <Route exact path="/" component={Home} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
