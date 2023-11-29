import { API_URL_MY_PETS } from '@src/common/constants/api';

export const getPets = async () => {
	const data = await fetch(API_URL_MY_PETS);
	const pets = await data.json();
	return pets;
};
