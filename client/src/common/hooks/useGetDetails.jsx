import { useState, useEffect } from 'react';
import { API_URL_OFFERS } from '../constants/api';
function useGetDetails(id) {
	const [isLoading, setIsLoading] = useState(true);
	const [details, setDetails] = useState(false);
	useEffect(() => {
		const getDetails = async () => {
			const details = await fetch(`${API_URL_OFFERS}/${id}`);
            const detailsJson = await details.json();
			setDetails(detailsJson);
			setIsLoading(false);
		};
		getDetails();
        
	}, [id]);
	return { isLoading, details };
}

export default useGetDetails;
