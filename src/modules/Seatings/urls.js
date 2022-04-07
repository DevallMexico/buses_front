const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
  // BUSES ENDPOINT
  seatings: id => `${OPERATIONS_API_HOST}/api/seatings/${id ? `${id}/` : ""}`,
};