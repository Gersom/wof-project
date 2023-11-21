import { GET_OFFERS_OWNER , FILTER_OFFERS_OWNER } from '../types/offersTypes';

import { getOffersOwner } from '@src/common/utils/helpers-redux/getOffersOwner';

export const actionGetOffersOwner = () => async (dispatch) => {
	const offersOwner = await getOffersOwner();
	return dispatch({
		type: GET_OFFERS_OWNER,
		payload: offersOwner,
	});
};

export const actionFilterOffersOwner = (nameFilter) => {
	return {
		type: FILTER_OFFERS_OWNER,
		payload: nameFilter,
	};
};
