import axios from "axios";

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

  async register(name, password, email) {
    const response = await axios.post(API_URL + "user-create/", {
      name,
      password,
      email,
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