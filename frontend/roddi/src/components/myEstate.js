import React, {useState, useEffect} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import authService from '../services/auth.service';
import tempImage from '../images/WIP.jpg';
import '../App.css';

function MyEstate() {
  const [estateID, setEstateID] = useState(1);
  const [estateName, setEstateName] = useState("");
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    authService.getEstateFromID(estateID).then(res => {
      let tempEstate = new Estate();
      tempEstate.state = {
      id: res.data.id,
      name: res.data.name,
      status: res.data.status,
      members: res.data.users,
      }
      let initMembers = [];
      for (let i = 0; i < tempEstate.state.members.length; i++) {
          let tempUser = new User();
          tempUser.state = {
              id: res.data.users[i].id,
              name: res.data.users[i].name,
              email: res.data.users[i].email
          }
          initMembers.push(tempUser);
      }
      let newMembers = members.concat(initMembers);
      setMembers(newMembers);
      setEstateName(res.data.name);
  })

  authService.getItemsByEstateID(estateID).then(res => {
    let initItems = [];
    let itemsLength = res.length;
    if (itemsLength != 0) {
        for (let i = 0; i < itemsLength; i++) {
            let tempItem = new Item();
            tempItem.state = {
                id: res[i].id,
                name: res[i].name,
                //wantedBy: res[i].voters
            }
            initItems.push(tempItem);
        }
    }
    let newItems = items.concat(initItems);
    setItems(newItems);
  })

  },[]);

  return(
    <div className="MyEstate">
      <div className="nameAndMembers">
          <div className="estateName">
              <h1>{estateName}</h1>
          </div>
          <div className="membersList">
              <h2>Deltakere</h2>
              {members.map((element, index) => (
                  <div key={"member"+index} id={"m"+index} style={{border: '1px solid'}}>
                      <h4>{element.state.name}</h4>
                  </div>
              ))}
          </div>
      </div>
      <div className="items">
        <h2>Eiendeler</h2>
        <div className="itemsList">
          <div className="itemRow">
            {items.map((element, index) => (
              <div key={"item"+index} id={"i"+index} style={{direction: "grid", border: '1px solid'}}>
                <img style={{height: "180px", width: "200px"}} src={tempImage} alt="temporary pic"/>
                <h4>{element.state.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyEstate;
