import React from 'react'
import User from "./User"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: "",
            picture: Blob, // Not sure about the blob-type, but we will check it out.
            description: "",
            userChoice: Map()//.set(User, 0), // map with user as key and priority as value
           
        }
        //this.setState(userChoice.set(User, 0)); // something like this to initiate map
    }
    
    

    render() {
        return (
            <div className="Item">
                <p>{this.state.name}</p>
            </div>
        );
    }
}

export default Item;