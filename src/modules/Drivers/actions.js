import axios from "axios";
import { endpoints } from "./urls";

axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem("authToken")}`;

export const getDriversList = () => {
  return axios.get(endpoints.drivers());
}

export const getDriversCatalog = () => {
  return axios.get(endpoints.driversCatalog);
}

export const createDriver = (data) => {
  return axios.post(endpoints.drivers(), data);
}

export const updateDriver = (data) => {
  return axios.patch(endpoints.drivers(data?.id), data);
}

export const deleteDriver = (id) => {
  return axios.delete(endpoints.drivers(id));
}
