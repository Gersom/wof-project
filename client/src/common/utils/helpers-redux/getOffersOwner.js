import { API_URL_OFFERS } from '@src/common/constants/api';

export const getOffersOwner = async () => {
	const response = await fetch(API_URL_OFFERS);
	const data = await response.json();
	return data;
};
