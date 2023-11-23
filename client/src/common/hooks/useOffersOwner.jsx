import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionGetOffersOwner } from '../store/actions/offersActions';

function useOffersOwner() {
	const dispatch = useDispatch();
	const offersOwner = useSelector((state) => state.offersReducer.offersOwner);
	console.log(offersOwner);
	useEffect(() => {
		dispatch(actionGetOffersOwner());
	}, [dispatch]);

	return offersOwner;
}

export default useOffersOwner;
