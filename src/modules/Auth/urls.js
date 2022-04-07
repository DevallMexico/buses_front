const OPERATIONS_API_HOST = "http://127.0.0.1:8000"

export const endpoints = {
    // USER ENDPOINTS
    userLogin: `${OPERATIONS_API_HOST}/auth-token/`,
    userRegister: `${OPERATIONS_API_HOST}/api/users/`,
    userLogOut: `${OPERATIONS_API_HOST}/api/users/logout/`,
  };