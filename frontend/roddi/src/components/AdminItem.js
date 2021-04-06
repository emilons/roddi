import React, {useState, useEffect} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import MemberVotes from './MemberVotes';
import StarVoteRender from './StarVoteRender';
import authService from '../services/auth.service';
import '../App.css';

/**
 * Admin page of a specific item. Admin can only view member votes but not interact with them.
 * @returns render of AdminItem
 */
function AdminItem() {
    const [isLoading, setIsLoading] = useState(true);
    const [estateID] = useState(localStorage.getItem('estateId'));
    const [itemID] = useState(localStorage.getItem('itemId'));
    const [estateName, setEstateName] = useState("");
    const [item, setItem] = useState(new Item());
    const [user] = useState({
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail')
    });
    const [members, setMembers] = useState([]); // all family members except current user
    const [memberChoiceMap, setMemberChoiceMap] = useState(new Map());

    /**
     * initialize estate and members
     */
    function initializeEstateAndMembers() {
        /**
         * initialize correct estate
         * @param {int} estateID - Id of current estate
         */
        authService.getEstateFromID(estateID).then(res => {
            let tempEstate = new Estate();
            tempEstate.state = {
            id: res.data.id,
            name: res.data.username,
            status: res.data.status,
            members: res.data.users,
            }
            let initMembers = [];
            
            for (let i = 0; i < tempEstate.state.members.length; i++) {
                let tempUser = new User();
                tempUser.state = {
                    id: res.data.users[i].id,
                    name: res.data.users[i].username,
                    email: res.data.users[i].email
                }
                if (tempUser.state.name != localStorage.getItem('userName')){
                    initMembers.push(tempUser);
                }
            }
            let newMembers = members.concat(initMembers);
            setMembers(newMembers);

            setEstateName(res.data.name);
            setIsLoading(false);
        })
    }

    /**
     * initialize item
     */
    function initializeItem() {
        /**
         * get the item
         * @param {int} itemID - Id of current item
         */
        authService.getItemByID(itemID).then(res => {
            let tempItem = new Item();
            tempItem.state = {
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                estate: res.data.estate,
                image: res.data.image,
                wantedBy: res.data.voters
            }
            setItem(tempItem);
            setIsLoading(false);
        })
        
        /**
         * get member votes on item from User-Item relation
         * @param {int} itemID - Id of current item
         */
        authService.getUserItemRelationByItemId(itemID).then(res => {
            let choiceMap = new Map();
            res.forEach(element => {
                let memberId = element.user
                choiceMap.set(memberId, element.wanted_level);
            })
            setMemberChoiceMap(choiceMap);
        })
    }

    /**
     * initialize page
     */
    useEffect(() => {
        initializeEstateAndMembers();
        initializeItem();
    }, []);

    
    function loadImage() {
        if (item.state.image == "") {
            return "";
        }
        else {
            return 'http://localhost:8000'+item.state.image
        }
    }

    return(
        <div className="AdminItem">
            <div className="estateNameAndItem">
                <div className="estateName">
                    <a href="#/AdminEstatePage" class="previousAI">&laquo; Tilbake</a>
                    <h2 id="headlineAI" >Familien {estateName}</h2>
                </div>
                <div className="itemAI">
                    <h4 >{item.state.name}</h4>
                    <p >{item.state.description}</p>
                    <img style={{height: "180px", width: "200px"}} src={loadImage()} alt="temporary pic"/>
                </div>
            </div>
            <div className="userInteractionsList">
                <h5 id ="headline1">Oversikt over avstemning:</h5>
                {members.map((element, index) => (
                    <div className="userInteractions" key={"user"+index} id={"u"+index} style={{border: '1px solid', margin: '20px'}}>
                        <div className="userNameAndComment">
                            <h5>{element.state.name}</h5>
                            
                        </div>
                        <div className="userVotes">
                        {(!isLoading) ? <MemberVotes value={memberChoiceMap.get(element.state.id)}/> : <p>Loading...</p>}
                        </div>
                        { memberChoiceMap.get(element.state.id) > 0 ? 
                        <div className="userStarVotes">
                            <StarVoteRender value={memberChoiceMap.get(element.state.id)}/>
                        </div> : <p></p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AdminItem;