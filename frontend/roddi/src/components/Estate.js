import React from 'react'
import User from "./Users/User"

class Estate extends React.Component {
    /* inneholder en array med familiemedlemmer, og en array med items */

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            items: [ ],
            members: [ ],
            open: true // Boolean for if the estate is finished.
        }
    }
    render() {
        return <h1>BILDE AV ESTATE</h1>;
    }
}

export default Estate;