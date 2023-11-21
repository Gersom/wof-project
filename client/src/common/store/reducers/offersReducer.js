import offersState from '../states/offersState';

import {
	GET_OFFERS_OWNER,
	GET_OFFERS_CAREGIVERS,
	FILTER_OFFERS_OWNER,
} from '../types/offersTypes';
import { filterOffers } from '@src/common/utils/helpers-redux/filterOffers';

const offersReducer = (state = offersState, { type, payload }) => {
	switch (type) {
		case GET_OFFERS_OWNER:
			return {
				...state,
				offersOwner: payload,
			};
		case GET_OFFERS_CAREGIVERS:
			return {
				...state,
				offersCareGivers: payload,
			};
		case FILTER_OFFERS_OWNER:
			return {
				...state,
                filtersOffersOwner: filterOffers(state.filtersOffersOwner, payload),
			};
		default:
			return { ...state };
	}
};

export default offersReducer;
