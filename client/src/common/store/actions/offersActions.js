
import { getOffersOwner } from '@src/common/utils/helpers-redux/getOffersOwner';
import { getOffersCareGivers } from '@src/common/utils/getOffersCareGivers';
export const actionGetOffersOwner = () => async (dispatch) => {
	const offersOwner = await getOffersOwner();
	return dispatch({
		type: 'GET_OFFERS_OWNER',
		payload: offersOwner,
	});
};

export const actionSetOffersOwner = (offersOwner) => {
	return {
		type: 'SET_OFFERS_OWNER',
		payload: offersOwner,
	};
};

export const actionFilterOffersOwner = (nameFilter) => {
	return {
		type: 'FILTER_OFFERS_OWNER',
		payload: nameFilter,
	};
};

export const actionSortOffersOwner = (nameSort) => {
	return {
		type: 'SORT_OFFERS_OWNER',
		payload: nameSort,
	};
};

//**-------------Caregivers---------------**/

export const actionGetOffersCareGivers = () => async (dispatch) => {
	const offersCareGivers = await getOffersCareGivers();
	return dispatch({
		type: 'GET_OFFERS_CAREGIVERS',
		payload: offersCareGivers,
	});
};

export const actionSetOffersCareGivers = (offersCareGivers) => {
	return {
		type: 'SET_OFFERS_CAREGIVERS',
		payload: offersCareGivers,
	};
}

export const actionFilterOffersCareGivers = (nameFilter) => {
	return {
		type: 'FILTER_OFFERS_CAREGIVERS',
		payload: nameFilter,
	};
};

export const actionSortOffersCareGivers = (nameSort) => {
	return {
		type: 'SORT_OFFERS_CAREGIVERS',
		payload: nameSort,
	};
};
