import { API_URL_CAREGIVERS } from '../constants/api';
import { useState, useEffect } from 'react';

const useGetDetailsCaregivers = (id) => {
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const getDetails = async () => {
			const response = await fetch(API_URL_CAREGIVERS + id);
			const data = await response.json();
			setDetails(data);
			setIsLoading(false);
		};
		getDetails();
	}, [id]);

	return { isLoading, details};
};

export default useGetDetailsCaregivers;
