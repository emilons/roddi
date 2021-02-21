import './App.css';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Login from './components/Login';
import Header from "./components/Header"
import RegisterUser from "./components/RegisterUser";
import AdminEstates from "./components/AdminEstates";

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
          <Route exact path="/" component=""/>  
      </div>
    </HashRouter>
  );
}

export default App;
