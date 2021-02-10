import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Header from "./components/Header"
import RegisterUser from "./components/RegisterUser";

function App() {
  return (
    <div className="App">
        <Header />
        <RegisterUser />
    </div>
  );
}

export default App;
