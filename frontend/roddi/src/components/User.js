import Estate from './Estate';
import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      email: '',
      password: '',
      estates: null,
      // Estate eller motsatt med user-array i Estate entiteten
    };
  }
}

export default User;
