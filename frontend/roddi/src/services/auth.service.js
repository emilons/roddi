import axios from "axios";

const API_URL = "http://localhost:8000/login/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password, estates) {
    return axios.post(API_URL + "user-create/", {
      name,
      email,
      password,
      estates,
    }).then(function (response) {console.log(response);})
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
} 

export default new AuthService();