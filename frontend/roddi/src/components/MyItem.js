import React, {useState, useEffect} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import authService from '../services/auth.service';
import tempImage from '../images/WIP.jpg';

import '../App.css';

function MyItem() {
    const [estateID, setEstateID] = useState(1); // need function for getting ID
    const [itemID, setItemID] = useState(7); // need function for getting ID
    const [estateName, setEstateName] = useState("");
    const [item, setItem] = useState(new Item());
    const [user, setUser] = useState(new User()); // current logged in user
    const [members, setMembers] = useState([]); // other family members

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
                // if tempUser.name == currentUser.name then skip (so that current user is not in member list)
                initMembers.push(tempUser);
            }
            let newMembers = members.concat(initMembers);
            setMembers(newMembers);
            setEstateName(res.data.name);
        })

        //getCurrentUser -> setUser(currentUser)

        authService.getItemByID(itemID).then(res => {
            let tempItem = new Item();
            const choiceMap = new Map()
            for (let i = 0; i < members.length; i++) {
                choiceMap.set(members[i], -1);
            }
            tempItem.state = {
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                estate: res.data.estate,
                userChoice: choiceMap
            }
            setItem(tempItem);
        })

    }, []);

    return(
        <div className="MyItem">
            <div className="estateNameAndItem">
                <div className="estateName">
                    <h1>{estateName}</h1>
                </div>
                <div className="item">
                    <h4>{item.state.name}</h4>
                    <p>{item.state.description}</p>
                    <img style={{height: "180px", width: "200px"}} src={tempImage} alt="temporary pic"/>
                </div>
            </div>
            <div className="userInteractionsList">
                {members.map((element, index) => (
                    <div className="userInteractions" key={"user"+index} id={"u"+index} style={{border: '1px solid', margin: '20px'}}>
                        <div className="userNameAndComment">
                            <h4>{element.state.name}</h4>
                            <p>Comment...</p> 
                        </div>
                        <div className="userVotes">
                        <div className="voteDivide" style={{border: '1px solid', margin: "2px"}}>Fordel</div>
                        <div className="voteDonate" style={{border: '1px solid', margin: "2px"}}>Doner</div>
                        <div className="voteTrash" style={{border: '1px solid', margin: "2px"}}>Kast</div>
                            {/* 
                            <div className="voteDivide"><input type="radio" value="Divide" name="vote"/> Fordel</div>
                            <div className="voteDonate"><input type="radio" value="Donate" name="vote"/> Doner</div>
                            <div className="voteTrash"><input type="radio" value="Trash" name="vote"/> Kast</div>
                            */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MyItem;