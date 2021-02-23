import React, {useState, useEffect} from 'react';
import Estate from './Estate';
import User from './User';
import Item from './Item';
import tempImage from '../images/-wide.jpg';
import authService from '../services/auth.service';

function testUsers() {
    let per = new User();
    per.state = {
        name: "Per"
    }
    let marte = new User();
    marte.state = {
        name: "Marte"
    }
    return [per,marte];
}

function AdminEstatePage() {
    const [estateID, setEstateID] = useState(1);
    const [items, setItems] = useState([]);
    const [members, setMembers] = useState(testUsers());


     // get Estates from Backend and initialize list of estates with these
     useEffect(() => {
        let tempEstate = new Estate();
        authService.getEstateFromID(estateID).then(res => {
            tempEstate.state = {
            id: res.id,
            name: res.name,
            status: res.status,
            members: []
            //members: res.users,
            }
            let initMembers = [];
            let membersLength;
            if (members != undefined) {
                membersLength = tempEstate.state.members.length;
            }
            else {
                membersLength = 0;
            }
            if (membersLength != 0) {
                for (let i = 0; i < membersLength; i++) {
                    let tempUser = new User();
                    tempUser.state = {
                        id: res.users[i].id,
                        name: res.users[i].name,
                        email: res.users[i].email
                    }
                    initMembers.push(tempUser);
                }
            }
            // Uncomment when working user array in Estate from backend
            //let newMembers = members.concat(initMembers);
            //setMembers(newMembers);
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

    function addItem() {

    }

    function editItem() {

    }

    return(
        <div className="AdminEstatePage" style={{display: 'flex', justifyContent: 'center', height: '100%', position: 'relative'}}>
            
            <div className="nameAndMembers">
                <div className="estateName">
                    <h1>Navn på oppgjør</h1>
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
                            </div>
                        ))}
                    </div>
                    <div className="addItem">
                        <button type="submit" className="btn btn-secondary" onClick={addItem}>Legg til eiendel</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default AdminEstatePage;