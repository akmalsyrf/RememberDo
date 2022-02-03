import axios from "axios";

export default API = axios.create({
  baseURL: "https://api-rememberdo.herokuapp.com/api/v1" || "http://192.168.0.169:5000/api/v1",
});
