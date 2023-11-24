import offersState from '../states/offersState';

import { filterOffers } from '@src/common/utils/helpers-redux/filterOffers';

const offersReducer = (state = offersState, { type, payload }) => {
	switch (type) {
		case 'GET_OFFERS_OWNER':
			return {
				...state,
				offersOwner: payload,
				offersOwnerInmutable: payload,
			};
		case 'SET_OFFERS_OWNER':
			return {
				...state,
				offersOwner: payload,
			};
		case 'FILTER_OFFERS_OWNER':
			return {
				...state,
				filtersOffersOwner: filterOffers(state.filtersOffersOwner, payload),
			};
		case 'SORT_OFFERS_OWNER':
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
		case 'GET_OFFERS_CAREGIVERS':
			return {
				...state,
				offersCareGivers: payload,
				offersCareGiversInmutable: payload,
			};
		case 'SET_OFFERS_CAREGIVERS':
			return {
				...state,
				offersCareGivers: payload,
			};
		case 'FILTER_OFFERS_CAREGIVERS':
			return {
				...state,
				filtersOffersCareGivers: filterOffers(
					state.filtersOffersCareGivers,
					payload
				),
			};
		case 'SORT_OFFERS_CAREGIVERS':
			return {
				...state,
				sortOffersCareGivers: state.sortOffersCareGivers.map((sort) => {
					if (sort.name === payload) {
						sort.value = true;
					} else {
						sort.value = false;
					}
					return sort;
				}),
			};
		default:
			return { ...state };
	}
};

export default offersReducer;
