import axios from "axios";
import { endpoints } from "./urls";

export const userLogin = (data) => {
  return axios.post(endpoints.userLogin, data);
}

export const userRegister = (data) => {
  return axios.post(endpoints.userRegister, data);
}

export const userLogOut = () => {
  let token = localStorage.getItem("authToken");
  return axios.get(endpoints.userLogOut, {
    headers: {
      Authorization: `Token ${token}`,
    }
  });
}