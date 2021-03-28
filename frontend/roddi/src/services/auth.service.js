import axios from 'axios';
import { Component } from 'react';

const API_URL = 'http://localhost:8000/api/';


//Useful where one needs current date in yyyy-mm-dd
function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * This class has all the functions which communicate with the database and is used in different parts of the program.
 */
class AuthService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      currentUser: '',
      isAdmin: false,
    };
  }


  /**
   * 
   * @param {*} username 
   * @param {*} password
   * 
   *  The login-function takes in two params, username and password. It then uses these to "log in" to the token-auth page
   *  where(if correct params are provided) a token and further information on the user is returned. 
   *  The information is stored in the localstorage so that we can use this data in other parts of the application. 
   *  Each time a user logs in, it get a unique token which is only valid for the time this user is logged in. 
   *  
   */
  async login(username, password) {
    const response = await axios
      .post('http://localhost:8000/token-auth/', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user.id);
          localStorage.setItem('userName', response.data.user.username);
          localStorage.setItem('userEmail', response.data.user.email);
          localStorage.setItem('isAdmin', response.data.user.is_superuser);
          window.location.reload(false);
        }
        return response.data;
      });
  }

  /**
   * Removes all of the information in the local storage.
   */

  logout() {
    localStorage.removeItem('token');
    window.location.reload(false);
  }


  /**
   * 
   * @param {*} username 
   * @param {*} password 
   * @param {*} email 
   * 
   *  Takes the params username, password and email, and sends this along to the /users/ api_url,
   *  where a user with these credentials is created. When a user is created, a token is also generated.
   */

  async register(username, password, email) {
    const response = await axios
      .post(API_URL + 'users/', {
        username,
        password,
        email,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        /*this.setState({
        loggedIn: true,
        currentUser: json.email,
        isAdmin: true
      })*/
      });
    window.location.reload(false);
    console.log(response);
  }

  //GET all Users created today
  async getUsersCreatedToday () {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => newEstatesList.push(item)));
    
      newEstatesList.forEach((element) => {
          if (element.date_joined.substring(0, 10) == formatDate()) {
          returnList.push(element);
        }
        });
      
    return returnList
  }



  // POST Estate to DB
  async addEstate(name, status) {
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

  //GET all Estates created today
  async getEstatesCreatedToday () {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'estate-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => newEstatesList.push(item)));
    
      newEstatesList.forEach((element) => {
          if (element.date_created == formatDate()) {
            returnList.push(element);
          }
        });
    return returnList
  }

    // GET estate by user
    async getEstatesByUser() {
      let returnList = [];
      let userInEstateList = [];
      let userId = localStorage.getItem('userId');
      await axios
        .get(API_URL + 'estate-list/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((response) =>
          response.data.map((element) => userInEstateList.push(element))
        );
      userInEstateList.forEach((element) => {
        element.users.forEach((user) => {
          if (user.id == userId) {
          returnList.push(element);
        }
        })
      });
      return returnList;
    }

  // GET specific estate from DB
  async getEstateFromID(id) {
    const response = await axios.get(
      API_URL + 'estate-detail/' + localStorage.getItem('estateId'),
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    return response;
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
  // GET item by item ID
  async getItemByID(itemId) {
    const response = await axios.get(API_URL + "item-detail/" + itemId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
    return response;
  }

  // POST item to DB
  async addItem(name, description, image, estate) {
    //let voters = []; // temp solution
    const URL = API_URL + "item-newcreate/";
    const config = {headers : {Authorization : `JWT ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'}}

    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('estate', estate);

    axios
        .post(URL, formData, config);
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
        estate: estateId,
        user: userId,
      },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
  }

  //GET all Users
  async getUsers() {
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => returnList.push(item)));
    //console.log(returnList);
    return returnList;
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
  // GET User by ID
  async getUserByID(userId) {
    const response = await axios.get(API_URL + "user-detail/" + userId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    return response;
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
  
  // GET list of User_Item relations from ItemID
  async getUserItemRelationByItemId(itemId) {
    let totalUserItemList = [];
    let userItemList = [];
    await axios.get(API_URL + "user_item-list", {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response.data.map((element) => (
      totalUserItemList.push(element)
    )));
    totalUserItemList.forEach(element => {
      if (element.item == itemId) {
        userItemList.push(element);
      }
    })
    return userItemList;
  }

  //GET Votes created today across all Estates
  async getVotesFromToday () {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user_item-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => newEstatesList.push(item)));
    
      newEstatesList.forEach((element) => {
          if (element.date_created == formatDate()) {
            returnList.push(element);
          }
        });
    return returnList
  }

  // PUT User Vote in User_Item relation
  async putVote(itemId, userId, vote) {
    if (vote > 0 && vote < 6) {
      const response = await axios.put(API_URL + 'user_item-put/' + itemId + '-' + userId + '/', {
        donate: false,
        discard: false,
        wanted: true,
        wanted_level: vote,
        item_id: itemId,
        user_id: userId
      }, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
    }
    else if (vote == 0) {
      const response = await axios.put(API_URL + 'user_item-put/' + itemId + '-' + userId + '/', {
        donate: true,
        discard: false,
        wanted: false,
        wanted_level: vote,
        item_id: itemId,
        user_id: userId
      }, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
    }
    else {
      const response = await axios.put(API_URL + 'user_item-put/' + itemId + '-' + userId + '/', {
        donate: false,
        discard: true,
        wanted: false,
        wanted_level: vote,
        item_id: itemId,
        user_id: userId
      }, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
    }
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
