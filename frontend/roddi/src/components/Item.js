import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      image: '',
      description: '',
      estate: null,
      userChoice: null,
    };
  }
}

export default Item;
