import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import tempImage from '../images/house.jpg'
import authService from '../services/auth.service';
import { Link } from 'react-router-dom';

/**
 * User page with overview of all estates user is in.
 * @returns render of MyEstates
 */
function MyEstates() {
  const [estates, setEstates] = useState([]);

  /**
   * get estates from backend and initialize list of estates with these
   */
  useEffect(() => {
    authService.getEstatesByUser().then((res) => {
      let initEstates = [];
      for (let i = 0; i < res.length; i++) {
        let tempEstate = new Estate();
        tempEstate.state = {
          id: res[i].id,
          name: res[i].name,
          status: res[i].status
        };
        initEstates.push(tempEstate);
      }
      let newEstates = estates.concat(initEstates);
      setEstates(newEstates);
    });
  }, []);
    
    return(
        <div className="MyEstates">
            <div className="estates">
                <div className="estateList" style={{marginLeft: 100, marginRight: 100, marginTop: 20, marginBottom: 30, width: 650}}>
                {estates.length == 0 ? <p></p> : <p>Mine dødsbo:</p>}
                    {estates.length == 0 ? <p>Det ser ut som du ikke er lagt til i et dødsbo enda. Vennligst ta kontakt med din administrator</p> : (estates.map((item, index) => (
                        <div key={"estate"+index} id={"e"+index} style={{border: '2px outset'}}>
                            <h1 style={{margin:'20px 0 20px 0', fontSize: "3vw", color: "#454343", textAlign:"center"}}> {item.state.name}</h1>
                            <img id="tempImage" src={tempImage} alt="temporary pic"/>
                            
                            <button className= "divButton" onClick={() => localStorage.setItem('estateId', item.state.id)}>
                              <Link
                                to={{
                                  pathname: '/MyEstatePage',
                                }}
                              >
                                Gå til dødsbo
                              </Link>
                            </button>
                        </div>
                        
                    )))}
                </div>
              </div>
      </div>
  );
}

export default MyEstates;
