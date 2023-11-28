const apiUrlEnv = import.meta.env.VITE_API_URL;
const apiUrlLocal = "http://localhost:3001";

export const API = apiUrlEnv || apiUrlLocal;
export const API_URL = API + "/api";

export const API_URL_ITEMS = API_URL + "/items";
export const API_URL_OFFERS = API_URL + "/offers";
export const API_URL_PROVINCES = API_URL + "/provinces";
export const API_URL_REVIEWS = API_URL + "/reviews";

export const API_URL_USER = API_URL + "/users";
export const API_URL_LOGIN = API_URL_USER + "/login";
export const API_URL_REGISTER = API_URL_USER;
