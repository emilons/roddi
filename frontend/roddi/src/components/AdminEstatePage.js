import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Estate from './Estate';
import User from './User';
import Item from './Item';
import authService from '../services/auth.service';
import Modal from 'react-modal';
import '../App.css';

function AdminEstatePage() {
  // EstateID based on props
  const [estateID] = useState(localStorage.getItem('estateId'));
  const [estateName, setEstateName] = useState('');
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersInEstate, setMembersInEstate] = useState([]);
  const [itemModalIsOpen, setItemModalIsOpen] = useState(false);
  const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);
  const [mailTo, setMailTo] = useState('');

  // State for add Item Modal
  const [addNewItem, setAddNewItem] = useState({
    itemName: '',
    itemDescription: '',
    // state for item picture
  });
  const [postImage, setPostImage] = useState(null);
  const handleItemChange = (e) => {
    const { id, value } = e.target;
    setAddNewItem((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleItemImageChange = (e) => {
    setPostImage({ image: e.target.files });
  };

  const [addNewMember, setAddNewMember] = useState({
    memberEmail: '',
  });

  // State for add Member Modal
  const handleMemberChange = (e) => {
    const { id, value } = e.target;
    setAddNewMember((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // get Estates from Backend and initialize list of estates with these
  useEffect(() => {
    authService.getEstateFromID(estateID).then((res) => {
      let tempEstate = new Estate();
      tempEstate.state = {
        id: res.data.id,
        name: res.data.name,
        status: res.data.status,
        members: res.data.users,
      };
      let initMembers = [];
      let memberEmails = 'mailto:';
      for (let i = 0; i < tempEstate.state.members.length; i++) {
        let tempUser = new User();
        tempUser.state = {
          id: res.data.users[i].id,
          name: res.data.users[i].username,
          email: res.data.users[i].email,
        };
        initMembers.push(tempUser);
        memberEmails += ',' + tempUser.state.email;
      }
      let newMembers = members.concat(initMembers);
      setMembers(newMembers);
      setEstateName(res.data.name);
      setMailTo(memberEmails);
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
    if (postImage === null) {
    } else {
      let newItems = items.concat([x]);
      authService.addItem(
        x.state.name,
        x.state.description,
        postImage.image[0],
        x.state.estate
      );
      setItems(newItems);
      setAddNewItem({ itemName: '', itemDescription: '' });
      closeItemModal();

      //Trenger en liten delay før reload her, eller så vil serveren til tider ikke henge med på bildelaging
      setTimeout(function () {
        window.location.reload(false);
      }, 200);
    }
  }

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
    authService.getUserIdByEmail(addNewMember.memberEmail).then((res) => {
      let x = new User();
      if (res[0] != undefined) {
        x.state = {
          id: res[0].id,
          name: res[0].name,
          email: res[0].email,
        };
        let newMembers = members.concat([x]);
        authService.addMember(estateID, x.state.id);
        console.log(x.state.id);
        setMembers(newMembers);
        closeMemberModal();
        window.location.reload(false);
      } else {
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
          <a href={mailTo}>Varsle deltakere</a>
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
              id="myModal"
              isOpen={memberModalIsOpen}
              onRequestClose={closeMemberModal}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <h2>Brukere</h2>
              <form>
                <div className="form-group text-left">
                  <label htmlFor="memberEmail">Fyll inn bruker email:</label>
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
              <button
                id="estateButton"
                className="btn btn-outline-danger"
                onClick={submitMember}
              >
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
                  src={'http://localhost:8000' + element.state.image}
                  alt="temporary pic"
                />
                <h4>{element.state.name}</h4>
                <button
                  onClick={() =>
                    localStorage.setItem('itemId', element.state.id)
                  }
                >
                  <Link
                    to={{
                      pathname: '/AdminItem',
                    }}
                  >
                    Gå til eiendel
                  </Link>
                </button>
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
              id="myModal"
              isOpen={itemModalIsOpen}
              onRequestClose={closeItemModal}
              contentLabel="Example Modal"
              ariaHideApp={false}
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
                <div className="form-group text-left">
                  <label htmlFor="itemImage">Legg til et bilde</label>
                  <input
                    accept="image/*"
                    className="form-control"
                    id="post-image"
                    onChange={handleItemImageChange}
                    name="image"
                    type="file"
                    data-testid="Velg fil"
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
