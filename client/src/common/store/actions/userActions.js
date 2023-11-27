import { getUser } from '../../utils/helpers-redux/getUser';
import { API_URL_CREATE_USER } from '@src/common/constants/api';

export const actionGetUser = (userId) => async (dispatch) => {
	const user = await getUser(userId);
	return dispatch({
		type: 'SET_USER',
		payload: user,
	});
};

export const postUser = (newUser) => {
	return async (dispatch) => {
		try {
			console.log(newUser);
			const response = await axios.post(API_URL_CREATE_USER, newUser);
			const data = response.data;
			dispatch({
				type: 'POST_USER',
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
};
