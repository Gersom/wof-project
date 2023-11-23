import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	actionGetOffersOwner,
	actionSetOffersOwner,
} from '../store/actions/offersActions';
import { sortOffersOwner } from '../utils/helpers-redux/sortOffersOwner';

const useOffersOwner = () => {
	const dispatch = useDispatch();
	const offersOwner = useSelector((state) => state.offersReducer.offersOwner);
	const sortsOffersOwner = useSelector(
		(state) => state.offersReducer.sortOffersOwner
	);
	const offersOwnerInmutable = useSelector(
		(state) => state.offersReducer.offersOwnerInmutable
	);

	useEffect(() => {
		if (offersOwnerInmutable.length === 0) {
			dispatch(actionGetOffersOwner());
		}
		dispatch(
			actionSetOffersOwner(sortOffersOwner(offersOwner, sortsOffersOwner))
		);
	}, [dispatch, offersOwnerInmutable.length, sortsOffersOwner]);
	
	return offersOwner;
};

export default useOffersOwner;
