import React, {useState} from 'react';
import Estate from './Estate';
import tempImage from '../images/-wide.jpg'
import authService from '../services/auth.service';

// gets Estate JSON objects from DB and sets initial Estate List
function getEstatesFromDB() {
    
    // temporary example objects
    let x = new Estate();
    x.state.name="Andersen";
    let y = new Estate();
    y.state.name="Solvang";
    // return Objects
    return [x,y];
}


function AdminEstates() {
    const [nameInput, setNameInput] = useState("");
    
    // get list of Estates from database and put in this array
    const [estates, setEstates] = useState(getEstatesFromDB());
    
    const handleChange = (e) => {
       setNameInput(e.target.value);
    }

    function addToEstateList() {
        let est = new Estate();
        est.state.name=nameInput;
        let newEstates = estates.concat([est]);
        authService.addEstate(est.state.name, est.state.status);
        setEstates(newEstates);
    }

    function submitEstate() {
        document.getElementById('confirmName').innerHTML = '';
        if (document.getElementById('nameInput').value != '') {
            addToEstateList();
            setNameInput("");
        }
        else {
            document.getElementById('confirmName').innerHTML = 'Vennligst fyll inn et navn på dødsboet!';
            document.getElementById('confirmName').style.color = 'red';
        }
    }
    
    
    return(
        <div>
            <div className="createEstate">
              <h1>Mine dødsbo:</h1>
            </div>

            <div className="estates">
                <ul className="estateList">
                    {estates.map((item, index) => (
                        <div key={"estate"+index} id={"e"+index}>
                            <h1>Dødsbo {item.state.name}</h1>
                            <img style={{height: "200px", width: "360px"}} src={tempImage} alt="temporary pic"/>
                            {/* img med src=item.state.image */}
                        </div>
                    ))}
                </ul>
            </div>
        </div>

    )
}
export default AdminEstates;


/* import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Estate from './Estate';

export default class MyEstate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> My Estate
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Estate:</strong> {currentUser.estate}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>
    );
  }
} */