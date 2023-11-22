import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionGetOffersOwner } from '../store/actions/offersActions';

function useOffersOwner() {
	const dispatch = useDispatch();
	const offersOwner = useSelector((state) => state.offersReducer.offersOwner);

	useEffect(() => {
		dispatch(actionGetOffersOwner());
	}, [dispatch, offersOwner]);

	return offersOwner;
}

export default useOffersOwner;
