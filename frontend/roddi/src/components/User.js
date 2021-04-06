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
    };
  }
}

export default User;
