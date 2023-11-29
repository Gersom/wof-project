import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '@src/common/utils/helpers-redux/myPets';
import { getMyPets } from '@src/common/store/slices/myPetsSlice';
import { useState, useEffect } from 'react';
const useGetMyPets = () => {
	const dispatch = useDispatch();
	const pets = useSelector((state) => state.myPetsReducer.myPets);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const get = async () => {
			const pets = await getPets();
			dispatch(getMyPets(pets));
			
		};
		get();
        setIsLoading(false);
	}, [dispatch]);

	return { pets, isLoading };
};

export default useGetMyPets;
