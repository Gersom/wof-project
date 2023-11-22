import userState from '../states/userState';
import { SET_USER } from '../types/userTypes';


const userReducer = (state = userState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			return {
				...state,
				user: payload,
			};

		default:
			return { ...state };
	}
};

export default userReducer;