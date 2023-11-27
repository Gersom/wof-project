import axios from "axios"
import {API_URL_USER} from "@common/constants/api"

export const getUser = async (userId) => {
	try {
    const response = await axios.get(API_URL_USER + userId);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
