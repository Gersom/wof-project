import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useAlert = () => {
	const location = useLocation();
	const alert = useSelector((state) => state?.alertReducer.alert);

	const createAlert = (message, type, id) => {
		const alertElement = document.createElement('section');
		alertElement.id = id;
		const alertMessage = document.createElement('h5');

		alertMessage.textContent = message;
		alertElement.appendChild(alertMessage);

		if (type === 'error') {
			alertElement.classList.add(styles.alertError);
		} else if (type === 'success') {
			alertElement.classList.add(styles.alertSuccess);
		} else if (type === 'warning') {
			alertElement.classList.add(styles.alertWarning);
		}

		return alertElement;
	};

	useEffect(() => {
		const app = document.getElementById('App');
		const alertContainer = document.getElementById('alertContainer');
		if (alert.message) {
			if (app && alertContainer && alert.message) {
				const alertElement = createAlert(alert.message, alert.type, alert.id);

				if (alertContainer.childElementCount > 2) {
					alertContainer.removeChild(alertContainer.firstChild);
				}
				alertContainer.appendChild(alertElement);
				alertContainer.classList.add(styles.alertContainer);

				
					setTimeout(() => {
						let alertElement = document.getElementById(alert.id);
						if(alertElement){
							alertElement.remove();
						}
					}, 2000);
				
					setTimeout(() => {
						if (!alertContainer.hasChildNodes()) {
							alertContainer.remove();
						}
					}, 3000);
				

			} else if (app) {
				const alertContainer = document.createElement('div');
				alertContainer.id = 'alertContainer';

				const alertElement = createAlert(alert.message, alert.type, alert.id);

				alertContainer.appendChild(alertElement);
				alertContainer.classList.add(styles.alertContainer);
				app.appendChild(alertContainer);

				
					setTimeout(() => {
						let alertElement = document.getElementById(alert.id);
						if(alertElement){
							alertElement.remove();
						}
					}, 2000);
				
					if (!alertContainer.hasChildNodes()) {
						alertContainer.remove();
					}
				
			}
		}
	}, [alert.trigger]);

	return null;
};

export default useAlert;
