const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
  // SCHEDULES ENDPOINT
  schedules: id => `${OPERATIONS_API_HOST}/api/schedules/${id ? `${id}/` : ""}`,
  // SEATINGS ENDPOINTS
  seatings: id => `${OPERATIONS_API_HOST}/api/seatings/${id ? `${id}/` : ""}`,
  multipleSeatings: `${OPERATIONS_API_HOST}/api/seatings/multiple/`,
};