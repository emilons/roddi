import React, {useState, useEffect} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import MemberVotes from './MemberVotes';
import authService from '../services/auth.service';
import StarVote from './StarVote';
import StarVoteRender from './StarVoteRender';
import '../App.css';

/**
 * User page of a specific item. User can vote on an item and see other member's votes.
 * If user's vote is to divide, they can prioritize vote by an amount of stars 1-5.
 * @returns render of MyItem
 */
function MyItem() {
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
    const [userItemChoice, setUserItemChoice] = useState(); // what current user voted on this item
    const [members, setMembers] = useState([]); // all family members except current user
    const [memberChoiceMap, setMemberChoiceMap] = useState(new Map());

    /**
     * initialize estate and member states
     */
    function initializeEstateAndMembers() {
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
     * initialize the item
     */
    function initializeItem() {
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
        
        authService.getUserItemRelationByItemId(itemID).then(res => {
            let choiceMap = new Map();
            res.forEach(element => {
                let memberId = element.user
                choiceMap.set(memberId, element.wanted_level);
                if (user.id == element.user) {
                    setUserItemChoice(element.wanted_level)
                }
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

    /**
     * handler for user's vote selection
     * @param {GUI-Object} event - event.target identifies the GUI element that was clicked
     */
    function onChangeVote(event) {
        let itemId = localStorage.getItem('itemId');
        let userId = user.id;
        let vote = null
        if (event.target.value == "divide") {
            vote = 1;
        }
        else if (event.target.value == "donate") {
            vote = 0;
        }
        else if (event.target.value == "discard") {
            vote = -1;
        }
        setUserItemChoice(vote);
        authService.putVote(itemId, userId, vote);
    }

    /**
     * submits vote level by which star was clicked
     * @param {*} vote - the star that was clicked, from 1-5
     */
    function setWantedLevelAPI(vote) {
        let itemId = localStorage.getItem('itemId');
        let userId = user.id;
        authService.putVote(itemId, userId, vote);
    }



    function loadImage() {
        if (item.state.image == "") {
            return "";
        }
        else {
            return 'http://localhost:8000'+item.state.image
        }
    }
    

    return(
        <div className="MyItem">
            <div className="estateNameAndItem">
                <div className="estateName">
                <a href="#/MyEstatePage" class="previousMI">&laquo; Tilbake</a>
                <h1 id="headlineMI" >Familien {estateName}</h1>
                </div>
                <div className="itemMI">
                    <h4>{item.state.name}</h4>
                    <p>{item.state.description}</p>
                    <img style={{height: "180px", width: "200px"}} src={loadImage()} alt="loading pic"/>
                </div>
            </div>
            <div id = "votingBoxes" className="userInteractionsList">
                <div className="myVote" >
                    <div className="userNameAndComment">
                        <h5>{user.name}</h5>
                    
                    </div>
                    <div className="myUserPriority">
                        <div className="myUserVotes" onChange={onChangeVote}>
                            <div className="voteDivide"><input type="radio" value="divide" name="vote"/></div>
                            <div className="voteDonate"><input type="radio" value="donate" name="vote"/></div>
                            <div className="voteTrash"><input type="radio" value="discard" name="vote"/></div>
                        </div>
                        <div className="myVoteHighlight">
                            <MemberVotes value={userItemChoice}/>
                        </div>
                    </div>
                    {userItemChoice > 0 ? 
                    <div className="myStarVote">
                        <StarVote value={userItemChoice} onClick={setWantedLevelAPI}/>
                    </div>
                    : <p></p>
                    }
                </div>            
                {members.map((element, index) => (
                    <div className="userInteractions" key={"user"+index} id={"u"+index} >
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
export default MyItem;