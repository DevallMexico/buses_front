import axios from "axios";
import { endpoints } from "./urls";

axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem("authToken")}`;

export const getTravelsList = () => {
  return axios.get(endpoints.travels());
}

export const createTravel = (data) => {
  return axios.post(endpoints.travels(), data);
}

export const updateTravel = (data) => {
  return axios.patch(endpoints.travels(data?.id), data);
}

export const deleteTravel = (id) => {
  return axios.delete(endpoints.travels(id));
}
