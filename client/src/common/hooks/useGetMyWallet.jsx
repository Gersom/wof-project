import { API_URL_CAREGIVERS } from '../constants/api';
import { useState, useEffect } from 'react';

const useGetMyWallet = (id) => {
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const getWallet = async () => {
			const response = await fetch(`${API_URL_CAREGIVERS}${id}/wallet`);
			const data = await response.json();
			setDetails(data);
			setIsLoading(false);
		};
		getWallet();
	}, [id]);

	return { isLoading, details};
};

export default useGetMyWallet;