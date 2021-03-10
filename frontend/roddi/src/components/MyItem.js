import React, {useState, useEffect, Fragment} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import MemberVotes from './MemberVotes';
import authService from '../services/auth.service';
import tempImage from '../images/WIP.jpg';

import '../App.css';






function MyItem() {
    const [isLoading, setIsLoading] = useState(true);
    const [estateID, setEstateID] = useState(1); // need function for getting ID
    const [itemID, setItemID] = useState(7); // need function for getting ID
    const [estateName, setEstateName] = useState("");
    const [item, setItem] = useState(new Item());
    const [user, setUser] = useState(new User()); // current logged in user
    const [userItemChoice, setUserItemChoice] = useState(-1) // what current user voted on this item (update item.state.userChoice for this user based on this)
    const [members, setMembers] = useState([]); // all family members
    const [memberChoiceMap, setMemberChoiceMap] = useState(new Map())

    function initializeEstateAndMembers() {
        authService.getEstateFromID(estateID).then(res => {
            let tempEstate = new Estate();
            tempEstate.state = {
            id: res.data.id,
            name: res.data.name,
            status: res.data.status,
            members: res.data.users,
            }
            let initMembers = [];
            let choiceMap = new Map()
            for (let i = 0; i < tempEstate.state.members.length; i++) {
                let tempUser = new User();
                tempUser.state = {
                    id: res.data.users[i].id,
                    name: res.data.users[i].name,
                    email: res.data.users[i].email
                }
                choiceMap.set(tempUser.state.name, -1);
                // if tempUser.name == currentUser.name then skip (so that current user is not in member list)
                initMembers.push(tempUser);
            }
            let newMembers = members.concat(initMembers);
            setMembers(newMembers);
            setEstateName(res.data.name);
            setMemberChoiceMap(choiceMap);
            setIsLoading(false);
        })
    }

    function initializeItem() {
        authService.getItemByID(itemID).then(res => {
            let tempItem = new Item();
            tempItem.state = {
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                estate: res.data.estate
            }
            setItem(tempItem);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        initializeEstateAndMembers();

        //getCurrentUser -> setUser(currentUser)
        initializeItem();
        
        
    }, []);

    
    function setVote(name, vote) {
        
    }

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
                        {(!isLoading) ? <MemberVotes value={memberChoiceMap.get(element.state.name)}/> : <p>Loading...</p>}


                        {/*element.state.userChoice[element.state.name] > 1 ? 
                            <div className="voteDivide" style={{border: '1px solid', margin: "2px", backgroundColor: 'yellow'}}>Fordel</div>
                        :
                            <div className="voteDivide" style={{border: '1px solid', margin: "2px", backgroundColor: 'white'}}>Fordel</div>

                            <div className="voteDonate" style={{border: '1px solid', margin: "2px"}}>Doner</div>
                            <div className="voteTrash" style={{border: '1px solid', margin: "2px"}}>Kast</div>
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