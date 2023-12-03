import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {actionGetOffersOwner,actionSetOffersOwner} from '../store/actions/offersActions';
import { sortOffersOwner } from '../utils/helpers-redux/sortOffersOwner';
import { filterOffersOwner } from '../utils/helpers-redux/filterOffersOwner';
import { setAlert } from '../store/slices/alertSlice';

const useOffersOwner = () => {
	const dispatch = useDispatch();
	const [isLoadingOffers, setIsLoadingOffers] = useState(true);
	const offersOwner = useSelector((state) => state.offersReducer.offersOwner);
	const offersOwnerInmutable = useSelector((state) => state.offersReducer.offersOwnerInmutable);
	const sortsOffersOwner = useSelector((state) => state.offersReducer.sortOffersOwner);
	const filtersOffersOwner = useSelector((state) => state.offersReducer.filtersOffersOwner);

	useEffect(() => {
		setIsLoadingOffers(true);
		if (offersOwnerInmutable.length === 0) {
			dispatch(actionGetOffersOwner());
		}
		let filteredOffers = filterOffersOwner(
			offersOwnerInmutable,
			filtersOffersOwner
		);
		let sortedOffers = sortOffersOwner(filteredOffers, sortsOffersOwner);
		dispatch(actionSetOffersOwner(sortedOffers));

		setIsLoadingOffers(false);

	}, [dispatch,offersOwnerInmutable,sortsOffersOwner,filtersOffersOwner]);


	useEffect(() => {
		if(offersOwnerInmutable.length !== 0 && offersOwner.length === 0){
			dispatch(setAlert({message:'No se encontraron ofertas para esa busqueda',type:'warning'}));
		}
	}, [offersOwner.length,dispatch, offersOwnerInmutable.length]);

	return { isLoadingOffers, offersOwner };
};

export default useOffersOwner;
