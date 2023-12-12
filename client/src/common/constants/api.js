import { API_URL_DEPLOY, WS_URL_LOCAL } from "./envs";

const apiUrlLocal = "http://localhost:3001";
const wsUrlLocal = "wss://wof-server.up.railway.app";

export const WS_URL = WS_URL_LOCAL || wsUrlLocal;

export const API = API_URL_DEPLOY || apiUrlLocal;
export const API_URL = API + "/api";

export const API_URL_ITEMS = API_URL + "/items";
export const API_URL_OFFERS = API_URL + "/offers";
export const API_URL_PROVINCES = API_URL + "/provinces";
export const API_URL_COUNTRYS = API_URL + "/countries";
export const API_URL_REVIEWS = API_URL + "/reviews";
export const API_URL_SERVICES = API_URL + "/service-requests?post=";
export const API_URL_SERVICES_ALL = API_URL + "/service-requests/all";
export const API_URL_CREATE_POST = API_URL + "/posts";
export const API_URL_POSTS_CAREGIVERID = API_URL + "/posts?caregiverId=";
export const API_URL_POST_UPDATE_STATUS = API_URL + "/posts?postId=";

export const API_URL_USER = API_URL + "/users";
export const API_URL_LOGIN = API_URL_USER + "/login";
export const API_URL_REGISTER = API_URL_USER;
export const API_URL_UPDATE_USER = API_URL + "/users";
export const API_URL_TRANSACTIONS = API_URL + "/transactions";
export const API_URL_NOTIFICATIONS = API_URL + "/notifications?userId=";
export const API_URL_EXIST_USER_WHIT_EMAIL = API_URL_USER + "/email/";
export const API_URL_VERIFY_EMAIL = API_URL + "/verify_email";

export const API_URL_MY_PETS = API_URL + "/pets";
export const API_URL_MY_PETS_OWNER_ID = API_URL_MY_PETS + "?ownerId=";
export const API_URL_SPECIES = API_URL + "/species";
export const API_URL_BREEDS = API_URL + "/breeds?speciesId=";

export const API_URL_CAREGIVERS = API_URL + "/caregivers/";

export const API_URL_CHAT = API_URL + "/chat";
export const API_URL_CHAT_OWNER = API_URL_CHAT + "/owner/";
export const API_URL_CHAT_CAREGIVER = API_URL_CHAT + "/caregiver/";

export const API_URL_ADMIN_STATS = API_URL + "/admin/users-stats";
export const API_URL_ADMIN_INFO = API_URL + "/admin/users-info";
export const API_URL_ADIMIN_PROFITS = API_URL + "/profits";

export const API_URL_BAN_USER = API_URL + "/admin/delete-user/";
export const API_URL_UNBAN_USER = API_URL + "/admin/restore-user/";

export const API_URL_EMAIL_PAYPAL = API_URL + "/email-paypal";
export const API_URL_OWNERS = API_URL + "/owners";
