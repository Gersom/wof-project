import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useAlert = () => {
	const location = useLocation();
	const message = useSelector((state) => state?.alertReducer.alert?.message);

	const app = document.getElementById('App');
	
	useEffect(() => {
		if (app) {
			const newElement = document.createElement('div');
            newElement.classList.add(styles.newElement);
			newElement.textContent = message;
			app.appendChild(newElement);

			setTimeout(() => {
				newElement.remove();
			}, 3000);
		}
	}, [app, location.pathname, message]);

	return null;
};

export default useAlert;
