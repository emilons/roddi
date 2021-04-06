import React from 'react';

class Estate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      items: [],
      members: [],
      status: true, // whether estate is open or closed
    };
  }
}

export default Estate;
