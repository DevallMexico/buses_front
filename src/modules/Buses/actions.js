import axios from "axios";
import { endpoints } from "./urls";

axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem("authToken")}`;

export const getBusesList = () => {
  return axios.get(endpoints.buses());
}

export const getBusesCatalog = () => {
  return axios.get(endpoints.busesCatalog);
}

export const createBus = (data) => {
  return axios.post(endpoints.buses(), data);
}

export const updateBus = (data) => {
  return axios.patch(endpoints.buses(data?.id), data);
}

export const deleteBus = (id) => {
  return axios.delete(endpoints.buses(id));
}
