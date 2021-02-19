import React from 'react'
import Item from './Item';
import User from './User'

class Estate extends React.Component {
    /* inneholder en array med familiemedlemmer, og en array med items */

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            name: "",
            items: [],
            members: [],
            open: true // Boolean for if the estate is finished.
        }
    }
    
   

    render() {
        return (
            <div className="Estate">
                <h1>Familien {this.state.name}</h1>
                <div>
                </div>
            </div>
        );
    }
}

export default Estate;