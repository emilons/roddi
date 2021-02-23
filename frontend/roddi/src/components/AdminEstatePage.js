import React, {useState, useEffect} from 'react';
import Estate from './Estate';
import User from './User';
import Item from './Item';
import tempImage from '../images/-wide.jpg';
import authService from '../services/auth.service';
import Modal from 'react-modal';

Modal.setAppElement('#root')

function dummyUsers() {
    let per = new User();
    per.state = {
        id: 12,
        name: "Per"
    }
    let marte = new User();
    marte.state = {
        id: 12,
        name: "Marte"
    }
    return [per,marte];
}

function AdminEstatePage(props) {
    // EstateID based on props
    const [estateID, setEstateID] = useState(1);
    const [estateName, setEstateName] = useState("");
    const [items, setItems] = useState([]);
    const [members, setMembers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    // State for add Item Modal
    const [addNewItem, setAddNewItem] = useState({
        itemName: "",
        itemDescription: ""
    });
    // state for item picture
    
    

     // get Estates from Backend and initialize list of estates with these
     useEffect(() => {
        // setEstateID bbased on URL
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
            console.log("initMembers: " + initMembers);
        });
        authService.getItemsByEstateID(estateID).then(res => {
            console.log(res);
            let initItems = [];
            let itemsLength = res.length;
            if (itemsLength != 0) {
                for (let i = 0; i < itemsLength; i++) {
                    let tempItem = new Item();
                    tempItem.state = {
                        id: res[i].id,
                        name: res[i].name,
                        wantedBy: res[i].voters
                    }
                    initItems.push(tempItem);
                }
            }
            let newItems = items.concat(initItems);
            setItems(newItems);
            console.log("initItems: " + initItems);
        });
    }, [])


    function addMember() {

    }

    // Item functions
    function addItem() {
        openModal();
    }

    function submitItem() {
        const x = new Item()
        x.state = {
            name: addNewItem.itemName,
            description: addNewItem.itemDescription,
            estate: estateID
        }
        let newItems = items.concat([x]);
        authService.addItem(x.state.name, x.state.description, x.state.estate)
        setItems(newItems);
        closeModal()
    }

    function editItem() {

    }

    function deleteItem(guiId, itemId) {
       let GUIItem = document.getElementById(guiId);
       GUIItem.remove();
       console.log(itemId)
       authService.deleteItem(itemId);
    }

    const handleChange = (e) => {
        const {id , value} = e.target   
        setAddNewItem(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    // Modal functions
    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return(
        <div className="AdminEstatePage" style={{display: 'flex', justifyContent: 'center', height: '100%', position: 'relative'}}>
            
            <div className="nameAndMembers">
                <div className="estateName">
                    <h1>{estateName}</h1>
                </div>
                <div className="memebersList">
                    <h2>Deltakere</h2>
                    {members.map((element, index) => (
                        <div key={"member"+index} id={"m"+index} style={{border: '1px solid'}}>
                            <h4>{element.state.name}</h4>
                        </div>
                    ))}
                    <div className="addMember">
                        <button type="submit" className="btn btn-secondary" onClick={addMember}>Legg til medlem</button>
                    </div>
                </div>
            </div>
            <div className="items">
                <h2>Eiendeler</h2>
                <div className="itemsList">
                    <div className="itemRow">
                        {items.map((element, index) => (
                            <div key={"item"+index} id={"i"+index} style={{border: '1px solid', flexDirection: 'column'}}>
                                <img style={{height: "100px", width: "260px"}} src={tempImage} alt="temporary pic"/>
                                <h4>{element.state.name}</h4>
                                <button type="button" className="btn-primary" onClick={editItem}>Rediger</button>
                                <button type="button" className="btn-danger" onClick={() => deleteItem("i"+index,element.state.id)}>Slett</button>
                            </div>
                        ))}
                    </div>
                    <div className="addItem">
                        <button type="submit" className="btn btn-secondary" onClick={addItem}>Legg til eiendel</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal">
                            <h2>Oppgjør: {estateName}</h2>
                            <form>
                                <div className="form-group text-left">
                                    <label htmlFor="itemName">Legg til en eiendel</label>
                                    <input type="name" 
                                        className="form-control"
                                        id="itemName" 
                                        required
                                        placeholder="Navn på eiendel" 
                                        value={addNewItem.itemName} 
                                        onChange={handleChange}/>
                                </div> 
                                <div className="form-group text-left">
                                    <label htmlFor="itemDescription">Legg til en beskrivelse</label>
                                    <textarea type="text"
                                        className="form-control"
                                        id="itemDescription"
                                        required
                                        placeholder="..."
                                        value={addNewItem.itemDescription}
                                        onChange={handleChange}/>
                                </div>
                            </form>
                            <button onClick={submitItem}>Legg til eiendel</button>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default AdminEstatePage;