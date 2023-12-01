import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import errorIcon from '@icons/errorIcon.svg';
import successIcon from '@icons/successIcon.svg';
import warningIcon from '@icons/warningIcon.svg';

const useAlert = () => {
	const location = useLocation();
	const alert = useSelector((state) => state?.alertReducer.alert);

	const createAlert = (message, type, id) => {
		const alertElement = document.createElement('section');
		alertElement.id = id;
		const alertIcon = document.createElement('img');
		const messageContainer = document.createElement('div');
		const messageDefault = document.createElement('h4');
		const alertMessage = document.createElement('h5');
		const buttonClose = document.createElement('button');
		const progressBar = document.createElement('div');

		buttonClose.addEventListener('click', () => {
			let alertElement = document.getElementById(id);
			if(alertElement){
				alertElement.remove();
			}
		});

		progressBar.classList.add(styles.progressBar);


		alertElement.appendChild(alertIcon);
		alertElement.appendChild(messageContainer);
		messageContainer.appendChild(messageDefault);
		messageContainer.appendChild(alertMessage);
		alertElement.appendChild(buttonClose);
		alertElement.appendChild(progressBar);

		buttonClose.textContent = '✖';
		alertMessage.textContent = message;

		if (type === 'error') {
			alertIcon.src = errorIcon;
			messageDefault.textContent = 'Error';
			alertElement.classList.add(styles.alertError);
		} else if (type === 'success') {
			alertIcon.src = successIcon;
			messageDefault.textContent = 'Estupendo';
			alertElement.classList.add(styles.alertSuccess);
		} else if (type === 'warning') {
			alertIcon.src = warningIcon;
			messageDefault.textContent = 'Advertencia';
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
					}, 6000);
				
					setTimeout(() => {
						if (!alertContainer.hasChildNodes()) {
							alertContainer.remove();
						}
					}, 7000);
				

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
					}, 6000);
				
					if (!alertContainer.hasChildNodes()) {
						alertContainer.remove();
					}
				
			}
		}
	}, [alert.trigger]);

	return null;
};

export default useAlert;
