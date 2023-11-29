const apiUrlEnv = import.meta.env.VITE_API_URL;
const apiUrlLocal = "http://localhost:3001";

export const API = apiUrlEnv || apiUrlLocal;
export const API_URL = API + "/api";

export const API_URL_ITEMS = API_URL + "/items";
export const API_URL_OFFERS = API_URL + "/offers";
export const API_URL_PROVINCES = API_URL + "/provinces";
export const API_URL_COUNTRYS = API_URL + "/countries";
export const API_URL_REVIEWS = API_URL + "/reviews";
export const API_URL_SERVICES = API_URL + "/service-requests?post="

export const API_URL_USER = API_URL + "/users";
export const API_URL_LOGIN = API_URL_USER + "/login";
export const API_URL_REGISTER = API_URL_USER;
export const API_URL_TRANSACTIONS = API_URL + "/transactions";

export const API_URL_MY_PETS = API_URL + "/pets";
export const API_URL_SPECIES = API_URL + "/species";
export const API_URL_BREEDS = API_URL + "/breeds?specie=";
