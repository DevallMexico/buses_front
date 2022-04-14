const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
  // BUSES ENDPOINT
  drivers: id => `${OPERATIONS_API_HOST}/api/drivers/${id ? `${id}/` : ""}`,
  driversCatalog: `${OPERATIONS_API_HOST}/api/drivers/catalog/`,
};