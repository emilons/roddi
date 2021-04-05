import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import tempImage from '../images/house.jpg'
import authService from '../services/auth.service';
import { Link } from 'react-router-dom';

function AdminEstates() {
  const [nameInput, setNameInput] = useState('');
  const [estates, setEstates] = useState([]);

  // get Estates from Backend and initialize list of estates with these
  useEffect(() => {
    authService.getEstates().then((res) => {
      let initEstates = [];
      for (let i = 0; i < res.length; i++) {
        let tempEstate = new Estate();
        tempEstate.state = {
          id: res[i].id,
          name: res[i].name,
          status: res[i].status,
        };
        initEstates.push(tempEstate);
      }
      let newEstates = estates.concat(initEstates);
      setEstates(newEstates);
    });
  }, []);

  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

  function addToEstateList() {
    const x = new Estate();
    x.state = {
      name: nameInput,
      status: true,
    };
    let newEstates = estates.concat([x]);
    authService.addEstate(x.state.name, true);
    setEstates(newEstates);
  }

  function submitEstate() {
    document.getElementById('confirmName').innerHTML = '';
    if (document.getElementById('nameInput').value != '') {
      addToEstateList();
      setNameInput('');
    } else {
      document.getElementById('confirmName').innerHTML =
        'Vennligst fyll inn et navn på dødsboet!';
      document.getElementById('confirmName').style.color = 'red';
    }
  }
    
    return(
        <div className="AdminEstates">
            <div className="createEstate">
                <form className="form">
                    <div className ="form-group text-left" >
                    <label htmlFor="estateNameInput">Opprett dødsbo</label>
                    <input type="text" 
                        className="form-control" 
                        id="nameInput" 
                        required
                        placeholder="Skriv inn navn på dødsbo" 
                        value={nameInput} 
                        onChange={handleChange}
                    />
                    </div>
                    <small id="confirmName" 
                        className="form-text"> 
                    </small>
                </form>
                <button type="submit" id = "AdminEstatesButtons" className="btn btn-outline-danger" onClick={submitEstate}>
                    Opprett dødsbo
                </button>
            </div>
            
            <div className="estates">
                <div className="estateList" style={{marginLeft: 100, marginRight: 100, marginTop: 20, marginBottom: 30, width: 650}}>
                <p>Alle dødsbo:</p>
                    {estates.map((item, index) => (
                        <div key={"estate"+index} id={"e"+index} style={{border: '2px outset'}}>
                            <h1 style={{margin:'20px 0 20px 0', fontSize: "3vw", color: "#454343", textAlign:"center"}}> {item.state.name}</h1>
                            <img id="tempImage" src={tempImage} alt="temporary pic"/>
                            {/* img med src=item.state.image */}
                            <button className= "divButton" onClick={() => localStorage.setItem('estateId', item.state.id)}>
                              <Link
                                to={{
                                  pathname: '/AdminEstatePage',
                                }}
                              >
                                Gå til dødsbo
                              </Link>
                            </button>
                        </div>
                        
                    ))}
                </div>
              </div>
        {/*<ul className="estateList" style={{margin: '50 50 50 50'}}></ul>*/}
      </div>
  );
}
export default AdminEstates;
