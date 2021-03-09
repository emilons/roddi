import React, {useState, useEffect} from "react";
import Estate from './Estate';
import User from './User';
import Item from './Item';
import authService from '../services/auth.service';
import tempImage from '../images/WIP.jpg';

import '../App.css';

function MyItem() {
    const [estateID, setEstateID] = useState(1);
    const [estateName, setEstateName] = useState("");
    const [item, setItem] = useState();
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

    }, []);

    return(
        <div className="MyItem">
            <div className="estateName">
              <h1>{estateName}</h1>
            </div>
            <div>
            <img style={{height: "180px", width: "200px"}} src={tempImage} alt="temporary pic"/>
            </div>
        </div>
    );
}
export default MyItem;