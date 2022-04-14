const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
  // BUSES ENDPOINT
  buses: id => `${OPERATIONS_API_HOST}/api/buses/${id ? `${id}/` : ""}`,
  busesCatalog: `${OPERATIONS_API_HOST}/api/buses/catalog/`,
};