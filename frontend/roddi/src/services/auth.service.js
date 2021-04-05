import axios from 'axios';
import { Component } from 'react';

const API_URL = 'http://localhost:8000/api/';

/**
 * Helperfunction for comparing dates of objects created
 */
function formatDate() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

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
    let success = null;
    try {
      const response = await axios
        .post('http://localhost:8000/token-auth/', {
          username,
          password,
        })
        .then((response) => {
          if (response.statusText == 'OK') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userName', response.data.user.username);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('isAdmin', response.data.user.is_superuser);
          }
          success = response.status;
        });
    } catch (e) {
      return 400;
    }
    return success;
  }

  /**
   * Removes all of the information in the local storage.
   */

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('estateId');
    localStorage.removeItem('itemId');
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
      });
    window.location.reload(false);
    console.log(response);
  }

  /**
   *  Gets all users created today
   */
  async getUsersCreatedToday() {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) =>
        response.data.map((item) => newEstatesList.push(item))
      );

    newEstatesList.forEach((element) => {
      if (element.date_joined.substring(0, 10) == formatDate()) {
        returnList.push(element);
      }
    });

    return returnList;
  }

  // POST Estate to DB
  /**
   *
   * @param {*} name
   * @param {*} status
   *
   *  Creates an Estate-object on the server with the given name, and status as open.
   *
   */
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

  /**
   *  Returns a list of all the current Estates
   */
  async getEstates() {
    let returnList = [];
    const response = await axios
      .get(API_URL + 'estate-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => returnList.push(item)));
    return returnList;
  }

  /**
   * Returns all the Estates created at the given date
   */
  async getEstatesCreatedToday() {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'estate-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) =>
        response.data.map((item) => newEstatesList.push(item))
      );

    newEstatesList.forEach((element) => {
      if (element.date_created == formatDate()) {
        returnList.push(element);
      }
    });
    return returnList;
  }

  /**
   * Gets all Estates and then maps through them and returns the Estates where the user in question is a member.
   */

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
      });
    });
    return returnList;
  }

  /**
   *
   * @param {*} id
   *
   * Returns the Estate with the id given in the function
   */
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

  /**
   *
   * @param {*} estateId
   *
   * Gets the Estate with the id given in the function, returns a list of the items it contains
   */
  async getItemsByEstateID(estateId) {
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

  /**
   *
   * @param {*} itemId
   *
   * Returns the item with the id given in the function
   */
  async getItemByID(itemId) {
    const response = await axios.get(API_URL + 'item-detail/' + itemId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    return response;
  }

  /**
   *
   * @param {*} name
   * @param {*} description
   * @param {*} image
   * @param {*} estate
   *
   * Sends a post request to the database with the information about the item which is then created.
   */
  async addItem(name, description, image, estate) {
    const URL = API_URL + 'item-newcreate/';
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('estate', estate);

    axios.post(URL, formData, config);
  }

  // DELETE item from DB
  /**
   *
   * @param {*} itemId
   *
   * Deletes the item with the given id from the database
   */
  async deleteItem(itemId) {
    const response = await axios.delete(API_URL + 'item-delete/' + itemId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    console.log(response);
  }

  /**
   *
   * @param {*} estateId
   * @param {*} userId
   *
   * Sends a post request to the database and connects the given Estate with the given user. "Adds the user to the Estate".
   */
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

  /**
   * Gets all of the users and returns them in a list.
   */
  async getUsers() {
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data.map((item) => returnList.push(item)));
    return returnList;
  }

  /**
   *
   * @param {*} userEmail
   *
   * Gets all the users, maps them, and returns the userId of the user who matches the email
   */
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
  /**
   *
   * @param {*} userId
   *
   * Returns the user with the given id
   */
  async getUserByID(userId) {
    const response = await axios.get(API_URL + 'user-detail/' + userId, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    });
    return response;
  }

  /**
   *
   * @param {*} estateId
   *
   *  Returns a list of the relations between Estates and users. Id of the relation, id of the user, and id of the Estate
   */
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
  /**
   *
   * @param {*} itemId
   *
   *  Returns a list of the different choices the users have made regarding the given item
   */
  async getUserItemRelationByItemId(itemId) {
    let totalUserItemList = [];
    let userItemList = [];
    await axios
      .get(API_URL + 'user_item-list', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) =>
        response.data.map((element) => totalUserItemList.push(element))
      );
    totalUserItemList.forEach((element) => {
      if (element.item == itemId) {
        userItemList.push(element);
      }
    });
    return userItemList;
  }

  /**
   * Returns a list of the votes that has been made that day across all Estates
   */
  async getVotesFromToday() {
    let newEstatesList = [];
    let returnList = [];
    const response = await axios
      .get(API_URL + 'user_item-list/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((response) =>
        response.data.map((item) => newEstatesList.push(item))
      );

    newEstatesList.forEach((element) => {
      if (element.date_created == formatDate()) {
        returnList.push(element);
      }
    });
    return returnList;
  }

  /**
   *
   * @param {*} itemId
   * @param {*} userId
   * @param {*} vote
   *
   *  Creates a relation between a user and an item, with the vote provided by the user
   */
  async putVote(itemId, userId, vote) {
    if (vote > 0 && vote < 6) {
      const response = await axios.put(
        API_URL + 'user_item-put/' + itemId + '-' + userId + '/',
        {
          donate: false,
          discard: false,
          wanted: true,
          wanted_level: vote,
          item_id: itemId,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        }
      );
    } else if (vote == 0) {
      const response = await axios.put(
        API_URL + 'user_item-put/' + itemId + '-' + userId + '/',
        {
          donate: true,
          discard: false,
          wanted: false,
          wanted_level: vote,
          item_id: itemId,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        }
      );
    } else {
      const response = await axios.put(
        API_URL + 'user_item-put/' + itemId + '-' + userId + '/',
        {
          donate: false,
          discard: true,
          wanted: false,
          wanted_level: vote,
          item_id: itemId,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        }
      );
    }
  }

  /**
   *
   * @param {*} userId
   *
   *  Deletes the relation between a user and an Estate. This results in the user being removed from the Estate
   */
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
}

export default new AuthService();
