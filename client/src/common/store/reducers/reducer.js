// imports
import initialState from '../states/state';

// Reducer
const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "ACTIVE_LOADING":
			return {
				...state,
				loading: true,
			};
		case "DISABLED_LOADING":
			return {
				...state,
				loading: false,
			};
		case "ADD_ITEM":
			return {
				...state,
				items: [...state.items, payload],
			};

		default:
			return { ...state };
	}
};

export default reducer;
