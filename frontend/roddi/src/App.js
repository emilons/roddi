import './App.css';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Login from './components/Login';
import Header from "./components/Header"
import RegisterUser from "./components/RegisterUser";
import AdminEstates from "./components/AdminEstates";
import AdminEstatePage from './components/AdminEstatePage';
//import MyEstate from './components/MyEstate';
import AuthService from "./services/auth.service";
import StartPage from './components/StartPage';

function logOut() {
  AuthService.logout();
}

function App() {

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
          <Route exact path="/" component={StartPage}/> 
      </div>
    </HashRouter>
  );
}

export default App;
