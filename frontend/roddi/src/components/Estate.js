import React, { Component } from 'react'
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
            status: true // Boolean for if the estate is finished.
        }
    }
    
    /* handleNameChange = event => {
        this.props.setEstateName(this.state.name);
    } */
}

export default Estate;