import axios from "axios";

const API_URL = "http://localhost:8000/login/api/";

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

  async addEstate(name, open) {
    const response = await axios.post(API_URL + "estate-create/", {
      name,
      open
    });
    console.log(response);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
} 

export default new AuthService();