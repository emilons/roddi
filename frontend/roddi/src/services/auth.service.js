import axios from "axios";
import Estate from "../components/Estate";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  async login(email, password) {
    /*    const response = await axios
          .post(API_URL + "signin", {
            email,
            password
          });
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; */
      } 
    
      logout() {
        localStorage.removeItem('token');    
      }
      
  async register(name, email, password, estates) {
    const response = await axios.post(API_URL + "user-create/", {
      name,
      email,
      password,
      estates,
    });
    localStorage.setItem('token', 'admin');
    window.location.reload(false);
    console.log(response);
  }

  // POST Estate to DB
  async addEstate(name, status) {
    const response = await axios.post(API_URL + "estate-create/", {
      name,
      status
    });
    console.log(response);
  }

  // GET List of Estates from DB
  async getEstates() {
    let returnList = [];
    const response = await axios.get(API_URL + "estate-list/")
      .then(
      response => response.data.map((item) => (
      returnList.push(item)
      )));
    //console.log(returnList);
    return returnList;
  }

  // GET specific estate from DB
  async getEstateFromID(id) {
    const response = await axios.get(API_URL + "estate-detail/" + id);
    return response;
  }

  // GET EstateID from url or something... ########for next sprint#########
  

  // GET items from DB by estate ID
  async getItemsByEstateID(estateId) {
    // Kinda bad solution at the moment, have to get all items first then sort by correct id
    // Pulling all items like this is not good but has to work for now
    let returnList = [];
    let itemList = [];
    const response = await axios.get(API_URL + "item-list")
    .then(
      response => response.data.map((item) => (
        itemList.push(item)
      )));
    itemList.forEach(element => {
      if (element.estate == estateId) {
        returnList.push(element);
      }
    })
    return returnList;
  }
  // GET item by item ID
  async getItemByID(itemId) {
    const response = await axios.get(API_URL + "item-detail/" + itemId);
    return response;
  }

  // POST item to DB
  async addItem(name, description, estate) {
    //let voters = []; // temp solution
    const response = await axios.post(API_URL + "item-create/", {
      name,
      description,
      estate
    });
    console.log(response);
  }

  // DELETE item from DB
  async deleteItem(itemId) {
    const response = await axios.delete(API_URL + "item-delete/" + itemId);
    console.log(response);
  }

  // ADD User to Estate
  async addMember(estateId, userId) {
    const response = await axios.post(API_URL + "user_in_estate-create/", {
      user: userId,
      estate: estateId
    });
    console.log(response);
  }

  // GET User by email
  async getUserIdByEmail(userEmail) {
    let returnList = []
    let userList = [];
    await axios.get(API_URL + "user-list/")
    .then(response => response.data.map((user) => (
      userList.push(user)
    )));
    userList.forEach(element => {
      if (element.email == userEmail) {
        returnList.push(element);
      }
    })
    return returnList;
  }
  // GET User by ID
  async getUserByID(userId) {
    const response = await axios.get(API_URL + "user-detail/" + userId);
    return response;
  }

  // GET user_in_estate ID
  async getUserInEstateId(estateId) {
    let returnList = [];
    let userInEstateList = [];
    await axios.get(API_URL + "user_in_estate-list/")
    .then(response => response.data.map((element) => (
      userInEstateList.push(element)
    )));
    userInEstateList.forEach(element => {
      if (element.estate == estateId) {
        returnList.push(element);
      }
    })
    return returnList;
  }
  
  // GET list of User_Item relations from ItemID
  async getUserItemRelationByItemId(itemId) {
    let totalUserItemList = [];
    let userItemList = [];
    await axios.get(API_URL + "user_item-list")
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

  // DELETE User from Estate
  async deleteMember(userId) {
    const response = await axios.delete(API_URL + "user_in_estate-delete/" + userId);
    console.log(response);
  }

  // GET logged in user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
} 

export default new AuthService();