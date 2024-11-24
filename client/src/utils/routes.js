export const FRONTEND_ROUTES = {
    HOME: "/home",
    LANDING: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    NOT_FOUND: "*",
  

};


export const BACKEND_PATHS = {
    LOGIN: "/api/login",
    REGISTER: "/api/register",
    FETCH_USER: "/api/user",
};

const BACKEND_BASE_URL = "http://localhost:8000";

export const BACKEND_ROUTES = {
    LOGIN: `${BACKEND_BASE_URL}${BACKEND_PATHS.LOGIN}`,
    REGISTER: `${BACKEND_BASE_URL}${BACKEND_PATHS.REGISTER}`,
    FETCH_USER: `${BACKEND_BASE_URL}${BACKEND_PATHS.FETCH_USER}`,
};