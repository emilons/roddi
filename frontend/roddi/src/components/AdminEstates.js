import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import tempImage from '../images/WIP.jpg';
import authService from '../services/auth.service';

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
      console.log(initEstates);
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

  return (
    <div className="AdminEstates">
      <div className="createEstate">
        <form className="form">
          <div className="form-group text-left">
            <label htmlFor="estateNameInput">Opprett Dødsbo</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              required
              placeholder="Skriv inn navn på dødsbo"
              value={nameInput}
              onChange={handleChange}
            />
          </div>
          <small id="confirmName" className="form-text"></small>
        </form>
        <button
          type="submit"
          className="btn btn-outline-danger"
          onClick={submitEstate}
        >
          Opprett Dødsbo
        </button>
      </div>

      <div
        className="estates"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          className="estateList"
          style={{ marginLeft: 100, marginRight: 100, width: 800 }}
        >
          {estates.map((item, index) => (
            <div
              key={'estate' + index}
              id={'e' + index}
              style={{ border: '1px solid' }}
            >
              <h1 style={{ margin: '20px 0 20px 300px' }}>
                Dødsbo {item.state.name}
              </h1>
              <img
                style={{ height: '200px', width: '360px' }}
                src={tempImage}
                alt="temporary pic"
              />
              {/* img med src=item.state.image */}
            </div>
          ))}
        </div>
        {/*<ul className="estateList" style={{margin: '50 50 50 50'}}></ul>*/}
      </div>
    </div>
  );
}
export default AdminEstates;
