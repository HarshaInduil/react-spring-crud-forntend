import axios from "axios";
import { API_URL } from "../Constants.js";

const url = `${API_URL}/auth/`;

const signUp = (signUpRequest) => {
  return axios.post(url + "sing-up", signUpRequest);
};

const login = async (loginRequest) => {
  const response = await axios.post(url + "login", loginRequest);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  login,
  logout,
};

export default authService;
