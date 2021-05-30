import axios from "axios";
import { API_URL } from "../Constants";
import authHeader from "./auth-header";
const url = `${API_URL}/advertisement`;

const user =  JSON.parse(localStorage.getItem("user"));

class AdvertisementService {
  getAllByUserId() {
    return axios.get(`${url}/get-by-user/${Number(user.id)}`, {
      headers: authHeader(),
    });
  }
  getById(id) {
    return axios.get(`${url}/${Number(id)}`, { headers: authHeader() });
  }
  add(object) {
    return axios.post(`${url}/`, object, { headers: authHeader() });
  }
  update(object) {
    return axios.put(`${url}/`, object, { headers: authHeader() });
  }
  delete(id) {
    return axios.delete(`${url}/${Number(id)}`, { headers: authHeader() });
  }
}

export default new AdvertisementService();
