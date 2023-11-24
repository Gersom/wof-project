import { useSelector } from 'react-redux';
import {
	actionFilterOffersOwner,
	actionSortOffersOwner,
	actionFilterOffersCareGivers,
	actionSortOffersCareGivers,
} from '../store/actions/offersActions';

const useSelectorSortFilter = ({ role }) => {
	const filters = useSelector((state) =>
		role === 'caregiver'
			? state.offersReducer.filtersOffersOwner
			: state.offersReducer.filtersOffersCareGivers
	);
	const sorts = useSelector((state) =>
		role === 'caregiver'
			? state.offersReducer.sortOffersOwner
			: state.offersReducer.sortOffersCareGivers
	);
	const actionFilter =
		role === 'caregiver' ? actionFilterOffersOwner : actionFilterOffersCareGivers;

	const actionSort =
		role === 'caregiver' ? actionSortOffersOwner : actionSortOffersCareGivers;

	return { filters, sorts, actionFilter, actionSort };
};

export default useSelectorSortFilter;
