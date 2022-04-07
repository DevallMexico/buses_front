const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
  // BUSES ENDPOINT
  travels: id => `${OPERATIONS_API_HOST}/api/travels/${id ? `${id}/` : ""}`,
};