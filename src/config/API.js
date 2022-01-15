import axios from "axios";

export default API = axios.create({
  baseURL: "http://192.168.0.169:5000/api/v1",
});
