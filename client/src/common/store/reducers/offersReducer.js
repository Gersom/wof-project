import offersState from '../states/offersState';

import {
	GET_OFFERS_OWNER,
	GET_OFFERS_CAREGIVERS,
	FILTER_OFFERS_OWNER,
	SORT_OFFERS_OWNER,
	SET_OFFERS_OWNER,
} from '../types/offersTypes';
import { filterOffers } from '@src/common/utils/helpers-redux/filterOffers';

const offersReducer = (state = offersState, { type, payload }) => {
	switch (type) {
		case GET_OFFERS_OWNER:
			return {
				...state,
				offersOwner: payload,
				offersOwnerInmutable: payload,
			};
		case SET_OFFERS_OWNER:
			return {
				...state,
				offersOwner: payload,
			};
		case FILTER_OFFERS_OWNER:
			return {
				...state,
				filtersOffersOwner: filterOffers(state.filtersOffersOwner, payload),
			};
		case SORT_OFFERS_OWNER:
			return {
				...state,
				sortOffersOwner: state.sortOffersOwner.map((sort) => {
					if (sort.name === payload) {
						sort.value = true;
					} else {
						sort.value = false;
					}
					return sort;
				}),
			};
		case GET_OFFERS_CAREGIVERS:
			return {
				...state,
				offersCareGivers: payload,
			};
		default:
			return { ...state };
	}
};

export default offersReducer;
