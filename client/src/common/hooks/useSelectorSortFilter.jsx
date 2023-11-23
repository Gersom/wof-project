import { useSelector } from 'react-redux';
import {
	actionFilterOffersOwner,
	actionSortOffersOwner,
	actionFilterOffersCareGivers,
	actionSortOffersCareGivers,
} from '../store/actions/offersActions';

const useSelectorSortFilter = ({ role }) => {
	const filters = useSelector((state) =>
		role === 'owner'
			? state.offersReducer.filtersOffersOwner
			: state.offersReducer.filtersOffersCareGivers
	);
	const sorts = useSelector((state) =>
		role === 'owner'
			? state.offersReducer.sortOffersOwner
			: state.offersReducer.sortOffersCareGivers
	);
	const actionFilter =
		role === 'owner' ? actionFilterOffersOwner : actionFilterOffersCareGivers;

	const actionSort =
		role === 'owner' ? actionSortOffersOwner : actionSortOffersCareGivers;

	return { filters, sorts, actionFilter, actionSort };
};

export default useSelectorSortFilter;
