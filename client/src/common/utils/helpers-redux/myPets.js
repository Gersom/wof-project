import { API_URL_MY_PETS_OWNER_ID } from '@src/common/constants/api';

export const getPets = async (ownerId) => {
	const data = await fetch(API_URL_MY_PETS_OWNER_ID + ownerId);
	const pets = await data.json();
	return pets;
};
