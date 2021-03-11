import axios from 'axios';
import { Component } from 'react';
import Estate from '../components/Estate';

const API_URL = 'http://localhost:8000/api/';

class AuthService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      currentUser: '',
      isAdmin: false,
    };
  }

  async login(username, password) {
    const response = await axios
      .post('http://localhost:8000/token-auth/', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          window.location.reload(false);
        }
        console.log(localStorage);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  async register(username, password, email) {
    const response = await axios
      .post(API_URL + 'users/', {
        username,
        password,
        email,
      })
      .then((json) => {
        localStorage.setItem('token', json.token);
        /*this.setState({
        loggedIn: true,
        currentUser: json.email,
        isAdmin: true
      })*/
      });
    window.location.reload(false);
    console.log(response);
  }

  // POST Estate to DB
  async addEstate(name, status) {
    console.log(`JWT ${localStorage.getItem('token')}`);
    const response = await axios.post(
      API_URL + 'estate-create/',
      {
        name,
        status,
      },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(`JWT ${localStorage.getItem('token')}`);
  }

  // GET List of Estates from DB
  async getEstates() {
    let returnList = [];
    const response = await axios
      .get(API_URL + 'estate-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => returnList.push(item)));
    //console.log(returnList);
    return returnList;
  }

  // GET specific estate from DB
  async getEstateFromID(id) {
    let returnList = [];
    const response = await axios.get(API_URL + 'estate-detail/' + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    return response;
    /* .then(
      response => response.data.map((item) => (
      returnList.push(item)
      )));
    //console.log(returnList);
    return returnList; */
  }

  // GET EstateID from url or something... ########for next sprint#########

  // GET items from DB by estate ID
  async getItemsByEstateID(estateId) {
    // Kinda bad solution at the moment, have to get all items first then sort by correct id
    // Pulling all items like this is not good but has to work for now
    let returnList = [];
    let itemList = [];
    const response = await axios
      .get(API_URL + 'item-list', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => itemList.push(item)));
    itemList.forEach((element) => {
      if (element.estate == estateId) {
        returnList.push(element);
      }
    });
    return returnList;
  }

  // POST item to DB
  async addItem(name, description, estate) {
    //let voters = []; // temp solution
    const response = await axios.post(
      API_URL + 'item-create/',
      {
        name,
        description,
        estate,
      },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
  }

  // DELETE item from DB
  async deleteItem(itemId) {
    const response = await axios.delete(API_URL + 'item-delete/' + itemId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    console.log(response);
  }

  // ADD User to Estate
  async addMember(estateId, userId) {
    const response = await axios.post(
      API_URL + 'user_in_estate-create/',
      {
        user: userId,
        estate: estateId,
      },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
  }

  // GET User by email
  async getUserIdByEmail(userEmail) {
    let returnList = [];
    let userList = [];
    await axios
      .get(API_URL + 'user-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((user) => userList.push(user)));
    userList.forEach((element) => {
      if (element.email == userEmail) {
        returnList.push(element);
      }
    });
    return returnList;
  }

  // GET user_in_estate ID
  async getUserInEstateId(estateId) {
    let returnList = [];
    let userInEstateList = [];
    await axios
      .get(API_URL + 'user_in_estate-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) =>
        response.data.map((element) => userInEstateList.push(element))
      );
    userInEstateList.forEach((element) => {
      if (element.estate == estateId) {
        returnList.push(element);
      }
    });
    return returnList;
  }

  // DELETE User from Estate
  async deleteMember(userId) {
    const response = await axios.delete(
      API_URL + 'user_in_estate-delete/' + userId,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
  }

  // GET logged in user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
