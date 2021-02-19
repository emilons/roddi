import React from 'react';
import Estate from './Estate'


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            // Estate eller motsatt med user-array i Estate entiteten
        }

    }
    render() {
        return (
            <div className="User">
                <p>{this.state.name}</p>
            </div>
        );
    }

}
export default User;