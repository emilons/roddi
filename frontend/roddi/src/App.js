import './App.css';
import { Route, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import RegisterUser from './components/RegisterUser';
import AdminEstates from './components/AdminEstates';
import AdminEstatePage from './components/AdminEstatePage';
import MyEstate from './components/MyEstate';
import MyItem from './components/MyItem';
import AuthService from "./services/auth.service";
import MyEstate from './components/MyEstate';
import { Component } from 'react';
import StartPage from './components/StartPage';

function logOut() {
  AuthService.logout();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      currentUser: '',
      isAdmin: false,
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
          <Route path="/AdminEstates" component={AdminEstates}/>
          <Route path="/AdminEstatePage" component={AdminEstatePage}/>
          <Route path="/MyEstate" component={MyEstate}/>
          <Route path="/MyItem" component={MyItem}/>
          <Route exact path="/" component={StartPage}/> 
      </div>
    </HashRouter>
  );
}}
export default App;
