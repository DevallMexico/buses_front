import axios from "axios";
import { endpoints } from "./urls";

axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem("authToken")}`;


export const createSeat = (data) => {
  return axios.post(endpoints.seatings(), data);
}

export const createMultipleSeatings = (data) => {
  return axios.post(endpoints.multipleSeatings, data);
}

export const getOccupiedSeats = (travelId) => {
  return axios.get(`${endpoints.seatings()}?travel=${travelId}`);
}
