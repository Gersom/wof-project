import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	actionGetOffersCareGivers,
	actionSetOffersCareGivers,
	actionClearOffersCareGivers
} from '../store/actions/offersActions';
import { sortOffersCaregivers } from '../utils/helpers-redux/sortOffersCaregivers';
const useOffersCaregivers = (id) => {
	const dispatch = useDispatch();
	const [isLoadingOffers, setIsLoadingOffers] = useState(true);
	const [idRequest, setIdRequest] = useState(null);

	const offersCareGiversInmutable = useSelector(
		(state) => state.offersReducer.offersCareGiversInmutable
	);
	const offersCareGivers = useSelector(
		(state) => state.offersReducer.offersCareGivers
	);
	const filtersOffersCareGivers = useSelector(
		(state) => state.offersReducer.filtersOffersCareGivers
	);
	const sortsOffersCareGivers = useSelector(
		(state) => state.offersReducer.sortOffersCareGivers
	);

	useEffect(() => {
		setIsLoadingOffers(true);
		
		if (id) {
			if( idRequest !== id){
				setIdRequest(id);
				dispatch(actionGetOffersCareGivers(id));
			}
			if (offersCareGiversInmutable.length === 0) {
				dispatch(actionGetOffersCareGivers(id));
			}
			// let filteredOffers = filterOffersCareGivers(
			// 	offersCareGiversInmutable,
			// 	filtersOffersCareGivers
			// );
			let sortedOffers = sortOffersCaregivers(
				offersCareGivers,
				sortsOffersCareGivers
			);
			dispatch(actionSetOffersCareGivers(sortedOffers));

			setIsLoadingOffers(false);
		}
		return () => {
			dispatch(actionClearOffersCareGivers());
			setIsLoadingOffers(true);
		};
	}, [
		id,
		dispatch,
		offersCareGiversInmutable.length,
		filtersOffersCareGivers,
		sortsOffersCareGivers,
		idRequest,
	]);

	return { isLoadingOffers, offersCareGivers };
};

export default useOffersCaregivers;
