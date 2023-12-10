import { API_URL_CAREGIVERS, API_URL_EMAIL_PAYPAL } from '@src/common/constants/api';
import axios from 'axios'

export const getWallet = async (id) => {
	try {
    const response = await axios.get(`${API_URL_CAREGIVERS}${id}/wallet`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const ChangeEmailPaypal = async (obj) => {
	try {
		await axios.put(API_URL_EMAIL_PAYPAL,obj)
	} catch (error) {
		console.log(error);
	}
}