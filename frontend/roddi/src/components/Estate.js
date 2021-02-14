import React, {State} from 'React'
import User from "./Users/User"

class Estate extends React.Component {
    /* inneholder en array med familiemedlemmer, og en array med items */

    constructor(props) {
        super(props);
        this.state = {
            items: [ ],
            members: [ ],
            open: true // Boolean for if the estate is finished.
        }
    }
}