import axios from "axios";
import { useState, Component } from 'react';
import { useHistory } from "react-router-dom";
import App from '../App';

const API_URL = "http://localhost:8000/api/";

class AuthService extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      currentUser: '',
      isAdmin: false
    };
  }
  
  async login(username, password) {
    const response = await axios
    .post("http://localhost:8000/token-auth/", {
      username,
      password,
    }).then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        window.location.reload(false);
      }
      console.log(localStorage);
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  componentDidMount() {
    if (this.state.logged_in) {
      console.log("Logged inn!")
      }
  }



  async register(username, password/*, email*/) {
    const response = await axios.post(API_URL + "users/", {
      username,
      password,
//      email
    }).then(json => {
      localStorage.setItem('token', json.token)
      /*this.setState({
        loggedIn: true,
        currentUser: json.email,
        isAdmin: true
      })
    });
    if (this.loggedIn) {
      this.props.push("/Login")
    }*/
  });
    window.location.reload(false);
}

  async addEstate(name, open) {
    console.log(`token ${localStorage.getItem('token')}`);
    const response = await axios.post(API_URL + "estate-create/", {
      name,
      open
      },
          { headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            }
          });
      console.log(`token ${localStorage.getItem('token')}`);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
} 

export default new AuthService();