import { httpClient } from "./httpClient";

export class AuthApi {
  register(payload) {
    return httpClient.post("/auth/register", payload);
  }

  login(payload) {
    return httpClient.post("/auth/login", payload);
  }

  logout() {
    return httpClient.post("/auth/logout");
  }
}
