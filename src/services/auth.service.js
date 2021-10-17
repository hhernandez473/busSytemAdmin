import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();