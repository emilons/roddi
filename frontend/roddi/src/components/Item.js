import React from 'React'
import User from "./Users/User"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture: Blob, // Not sure about the blob-type, but we will check it out.
            description: "",
            wanted: false,
            wantedBy: [...User],
            dispose: false,
            donate: false            
        }
    }
}