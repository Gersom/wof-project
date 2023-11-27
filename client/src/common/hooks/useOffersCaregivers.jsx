import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	actionGetOffersCareGivers,
	actionSetOffersCareGivers,
} from '../store/actions/offersActions';
import { sortOffersCaregivers } from '../utils/helpers-redux/sortOffersCaregivers';
const useOffersCaregivers = () => {
	const dispatch = useDispatch();
    const [isLoadingOffers, setIsLoadingOffers] = useState(true);
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
		if (offersCareGiversInmutable.length === 0) {
            console.log('----> me ejecuto interor')
			dispatch(actionGetOffersCareGivers());
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
	}, [
		dispatch,
		offersCareGiversInmutable.length,
		filtersOffersCareGivers,
		sortsOffersCareGivers,
	]);

	return { isLoadingOffers,offersCareGivers };
};

export default useOffersCaregivers;
