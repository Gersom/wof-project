import { API_URL_CAREGIVERS } from '@src/common/constants/api';
import axios from 'axios'
export const getWallet = async (id) => {
	try {
    const response = await axios.get(`${API_URL_CAREGIVERS}${id}/wallet`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};