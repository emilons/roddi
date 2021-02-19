import './App.css';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Login from './components/Login';
import Header from "./components/Header"
import RegisterUser from "./components/RegisterUser";
import AdminEstates from "./components/AdminEstates";
import myEstate from './components/myEstate';
import AuthService from "./services/auth.service";
import { useEffect } from 'react';

function logOut() {
  AuthService.logout();
}

function App() {

/*  const [state , setState] = useState({
    isAdmin: false,
    currentUser: undefined
  })

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        isAdmin: user.isAdmin,
        currentUser: user
      })
    };
  })
*/


  return (
    <HashRouter>
      <div className="Header">
          <Header />
      </div>
      <div className="App">
          <Route path="/Registrer" component={RegisterUser} />
          <Route path="/Login" component={Login} />
          <Route path="/AdminEstates" component={AdminEstates}/>
          <Route path="/my-estate" component={myEstate}/>
          <Route exact path="/" component=""/> 
      </div>
    </HashRouter>
  );
}

export default App;
