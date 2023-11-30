import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '@src/common/utils/helpers-redux/myPets';
import { getMyPets } from '@src/common/store/slices/myPetsSlice';
import { useState, useEffect } from 'react';
const useGetMyPets = (ownerId) => {
	const dispatch = useDispatch();
	const pets = useSelector((state) => state.myPetsReducer.myPets);
	const updatePetsTriger = useSelector((state) => state.myPetsReducer.updatePetsTriger);
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {
		setIsLoading(true);
		const get = async () => {
			const pets = await getPets(ownerId);
			dispatch(getMyPets(pets));
		};
		get();
        setIsLoading(false);
	}, [dispatch, ownerId, updatePetsTriger]);

	return { pets, isLoading };
};

export default useGetMyPets;
