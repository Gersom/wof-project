import { API_URL_SERVICES } from "../constants/api";

export const getOffersCareGivers = async (id) => {
	console.log("id", id);
	const response = await fetch(API_URL_SERVICES + id);
	const offers = await response.json();
	return offers;
};
