import React from 'react';
import User from './User';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      image: '',
      description: '',
      estate: null,
      userChoice: null
    };
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
