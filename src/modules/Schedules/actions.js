import axios from "axios";
import { endpoints } from "./urls";

axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem("authToken")}`;

export const getScheduleList = (queryParams=null) => {
  return axios.get(`${endpoints.schedules()}${queryParams ? `?${queryParams}` : ""}`);
}

export const createSchedule = (data) => {
  return axios.post(endpoints.schedules(), data);
}

export const updateSchedule = (data) => {
  return axios.patch(endpoints.schedules(data?.id), data);
}

export const deleteSchedule = (id) => {
  return axios.delete(endpoints.schedules(id));
}
