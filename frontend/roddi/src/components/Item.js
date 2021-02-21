import React from 'react'
import User from "./User"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture: Blob, // Not sure about the blob-type, but we will check it out.
            description: "",
            wanted: false,
            wantedBy: [],
            dispose: false,
            donate: false            
        }
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