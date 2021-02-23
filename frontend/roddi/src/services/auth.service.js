import axios from "axios";
import Estate from "../components/Estate";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(API_URL + "signin", {
        email,
        password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password, estates) {
    const response = await axios.post(API_URL + "user-create/", {
      username,
      email,
      password,
      estates,
    });
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
    let returnList = []
    const response = await axios.get(API_URL + "estate-list/")
      .then(
      response => response.data.map((item) => (
      returnList.push(item)
      )));
    //console.log(returnList);
    return returnList;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
} 

export default new AuthService();