import React, { useState, useEffect } from 'react';
import Estate from './Estate';
import User from './User';
import Item from './Item';
import tempImage from '../images/WIP.jpg';
import authService from '../services/auth.service';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root');

function dummyUsers() {
  let per = new User();
  per.state = {
    id: 12,
    name: 'Per',
  };
  let marte = new User();
  marte.state = {
    id: 12,
    name: 'Marte',
  };
  return [per, marte];
}

function AdminEstatePage(props) {
  //const { id } = props.location.id.id;

  // EstateID based on props
  const [estateID, setEstateID] = useState(localStorage.getItem("id")); // Metode som gir deg siden til estate med id man trykker på
  const [estateName, setEstateName] = useState("");
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersInEstate, setMembersInEstate] = useState([]);
  const [itemModalIsOpen, setItemModalIsOpen] = useState(false);
  const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);

  // State for add Item Modal
  const [addNewItem, setAddNewItem] = useState({
    itemName: "",
    itemDescription: "",
    // state for item picture
  });
  const handleItemChange = (e) => {
    const { id, value } = e.target;
    setAddNewItem((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // get Estates from Backend and initialize list of estates with these
  useEffect(() => {
    // setEstateID bbased on URL
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
          name: res.data.users[i].name,
          email: res.data.users[i].email,
        };
        initMembers.push(tempUser);
      }
      let newMembers = members.concat(initMembers);
      setMembers(newMembers);
      setEstateName(res.data.name);
    });
    authService.getUserInEstateId(estateID).then((res) => {
      let userInEstateList = [];
      for (let i = 0; i < res.length; i++) {
        let tempIdList = [res[i].id, res[i].user];
        userInEstateList.push(tempIdList);
      }
      let newIds = membersInEstate.concat(userInEstateList);
      setMembersInEstate(newIds);
    });

    authService.getItemsByEstateID(estateID).then((res) => {
      let initItems = [];
      let itemsLength = res.length;
      if (itemsLength != 0) {
        for (let i = 0; i < itemsLength; i++) {
          let tempItem = new Item();
          tempItem.state = {
            id: res[i].id,
            name: res[i].name,
            wantedBy: res[i].voters,
          };
          initItems.push(tempItem);
        }
      }
      let newItems = items.concat(initItems);
      setItems(newItems);
    });
  }, []);

  // Item functions
  // Modal functions
  function openItemModal() {
    setItemModalIsOpen(true);
  }

  function closeItemModal() {
    setItemModalIsOpen(false);
  }

  function addItem() {
    openItemModal();
  }

  function submitItem() {
    const x = new Item();
    x.state = {
      name: addNewItem.itemName,
      description: addNewItem.itemDescription,
      estate: estateID,
    };
    let newItems = items.concat([x]);
    console.log(newItems);
    authService.addItem(x.state.name, x.state.description, x.state.estate);
    setItems(newItems);
    setAddNewItem({ itemName: '', itemDescription: '' });
    closeItemModal();
    window.location.reload(false);
  }

  function editItem() {}

  function deleteItem(guiId, itemId) {
    let GUIItem = document.getElementById(guiId);
    GUIItem.remove();
    authService.deleteItem(itemId);
  }

  // Member functions
  function openMemberModal() {
    setMemberModalIsOpen(true);
  }

  function closeMemberModal() {
    setMemberModalIsOpen(false);
  }

  function addMember() {
    openMemberModal();
  }

  function submitMember() {
    //validering av input og om input allerede eksisterer i estate og om input i det hele tatt eksisterer
    authService
      .getUserIdByEmail(addNewMember.memberEmail)
      // legg til at man bare kan presse enter for å legge til
      .then((res) => {
        let x = new User();
        if (res[0] != undefined) {
          x.state = {
            id: res[0].id,
            name: res[0].name,
            email: res[0].email,
          };
          let newMembers = members.concat([x]);
          authService.addMember(estateID, x.state.id);
          setMembers(newMembers);
          closeMemberModal();
          window.location.reload(false);
        } else {
          // log that email doesnt exist
          document.getElementById('confirmEmail').innerHTML =
            'Vennligst fyll inn en eksisterende email!';
          document.getElementById('confirmEmail').style.color = 'red';
        }
      });
  }

  function deleteMember(guiId, userId) {
    let GUIMember = document.getElementById(guiId);
    let userInEstateId;
    GUIMember.remove();
    membersInEstate.forEach((element) => {
      if (element[1] == userId) {
        userInEstateId = element[0];
      }
    });
    authService.deleteMember(userInEstateId);
  }

  return (
    <div className="AdminEstatePage">
      <div className="nameAndMembers">
        <div className="estateName">
          <h1>{estateName}</h1>
        </div>
        <div className="membersList">
          <h2>Deltakere</h2>
          {members.map((element, index) => (
            <div
              key={'member' + index}
              id={'m' + index}
              style={{ border: '1px solid' }}
            >
              <h4>{element.state.name}</h4>
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => deleteMember('m' + index, element.state.id)}
              >
                Slett
              </button>
            </div>
          ))}
          <div className="addMember">
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={addMember}
            >
              Legg til medlem
            </button>
            <Modal
              isOpen={memberModalIsOpen}
              onRequestClose={closeMemberModal}
              contentLabel="Example Modal"
            >
              <h2>Brukere</h2>
              <form>
                <div className="form-group text-left">
                  <label htmlFor="memberEmail">Fyll inn bruker email</label>
                  <input
                    type="name"
                    className="form-control"
                    id="memberEmail"
                    required
                    value={addNewMember.memberEmail}
                    onChange={handleMemberChange}
                  />
                </div>
                <small id="confirmEmail" className="form-text"></small>
              </form>
              <button className="btn btn-outline-danger" onClick={submitMember}>
                Legg til medlem
              </button>
            </Modal>
          </div>
        </div>
      </div>
      <div className="items">
        <h2>Eiendeler</h2>
        <div className="itemsList">
          <div className="itemRow">
            {items.map((element, index) => (
              <div
                key={'item' + index}
                id={'i' + index}
                style={{ border: '1px solid' }}
              >
                <img
                  style={{ height: '180px', width: '200px' }}
                  src={tempImage}
                  alt="temporary pic"
                />
                <h4>{element.state.name}</h4>
                {/*<button type="button" className="btn-primary" onClick={editItem}>Rediger</button>*/}
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => deleteItem('i' + index, element.state.id)}
                >
                  Slett
                </button>
              </div>
            ))}
          </div>
          <div className="addItem">
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={addItem}
            >
              Legg til eiendel
            </button>
            <Modal
              isOpen={itemModalIsOpen}
              onRequestClose={closeItemModal}
              contentLabel="Example Modal"
            >
              <h2>Oppgjør: {estateName}</h2>
              <form>
                <div className="form-group text-left">
                  <label htmlFor="itemName">Legg til en eiendel</label>
                  <input
                    type="name"
                    className="form-control"
                    id="itemName"
                    required
                    placeholder="Navn på eiendel"
                    value={addNewItem.itemName}
                    onChange={handleItemChange}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="itemDescription">
                    Legg til en beskrivelse
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="itemDescription"
                    required
                    placeholder="..."
                    value={addNewItem.itemDescription}
                    onChange={handleItemChange}
                  />
                </div>
              </form>
              <button className="btn btn-outline-danger" onClick={submitItem}>
                Legg til eiendel
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminEstatePage;
