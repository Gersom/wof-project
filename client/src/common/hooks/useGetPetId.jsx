import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useGetPetId = (idPet) => {
	const pets = useSelector((state) => state.myPetsReducer.myPets);
	const [details, setDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (pets.length > 0) {
			const pet = pets.find((pet) => pet.id == idPet);
			setDetails(pet);
		} else {
			setDetails(null);
		}
		setIsLoading(false);
	}, [pets, idPet]);


	return { isLoading, details };
};

export default useGetPetId;
