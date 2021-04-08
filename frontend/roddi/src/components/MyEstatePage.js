import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Estate from './Estate';
import User from './User';
import Item from './Item';
import authService from '../services/auth.service';
import '../App.css';

/**
 * User page with overview of estate. Users can access items in the estate
 * @returns render of MyEstatePage
 */
function MyEstatePage() {
  const [estateID] = useState(localStorage.getItem('estateId'));
  const [estateName, setEstateName] = useState('');
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    /**
     * get all estates from backend and initialize correct estate
     * @param {int} estateID - Id of current estate
     */
    authService.getEstateFromID(estateID).then((res) => {
      let tempEstate = new Estate();
      tempEstate.state = {
        id: res.data.id,
        name: res.data.name,
        status: res.data.status,
        members: res.data.users,
      };
      let initMembers = [];
      for (let i = 0; i < tempEstate.state.members.length; i++) {
        let tempUser = new User();
        tempUser.state = {
          id: res.data.users[i].id,
          name: res.data.users[i].username,
          email: res.data.users[i].email,
        };
        initMembers.push(tempUser);
      }
      let newMembers = members.concat(initMembers);
      setMembers(newMembers);
      setEstateName(res.data.name);
    });

    /**
     * get items in an estate
     * @param {int} estateID - Id of current estate
     */
    authService.getItemsByEstateID(estateID).then((res) => {
      let initItems = [];
      let itemsLength = res.length;
      if (itemsLength != 0) {
        for (let i = 0; i < itemsLength; i++) {
          let tempItem = new Item();
          tempItem.state = {
            id: res[i].id,
            name: res[i].name,
            image: res[i].image,
            wantedBy: res[i].voters,
          };
          initItems.push(tempItem);
        }
      }
      let newItems = items.concat(initItems);
      setItems(newItems);
    });
  }, []);

  return (
    <div className="MyEstatePage">
      <div className="nameAndMembers">
        <div className="estateName">
          <a href="#/MyEstates" className="previousMI">
            &laquo; Tilbake
          </a>
          <h2 id="headlineEstateName">Familien {estateName}</h2>
        </div>
        <div className="membersList">
          <h4 id="title">Deltakere</h4>
          {members.map((element, index) => (
            <div className="Members" key={'member' + index} id={'m' + index}>
              <h4>{element.state.name}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="items">
        <h2 id="titleItemsMEP">Eiendeler</h2>
        <div className="itemsList">
          <div className="itemRow">
            {items.map((element, index) => (
              <div
                key={'item' + index}
                id={'i' + index}
                style={{
                  direction: 'grid',
                  border: '1px solid #ddd',
                  margin: '20px',
                }}
              >
                <img
                  style={{ height: '180px', width: '200px', margin: '20px' }}
                  src={'http://localhost:8000' + element.state.image}
                  alt="temporary pic"
                />
                <h4>{element.state.name}</h4>
                <button
                  className="divButtonMEP"
                  onClick={() =>
                    localStorage.setItem('itemId', element.state.id)
                  }
                >
                  <Link
                    to={{
                      pathname: '/MyItem',
                    }}
                  >
                    Eiendel
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyEstatePage;
