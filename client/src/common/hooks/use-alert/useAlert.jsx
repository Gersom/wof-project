import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import errorIcon from '@icons/states/error.svg';
import successIcon from '@icons/states/success.svg';
import warningIcon from '@icons/states/warning.svg';
import cross from '@icons/cross.svg';
import crossGrey from '@icons/crossGrey.svg';
import routerNames from '@src/common/constants/routes';

const useAlert = () => {
	const location = useLocation();
	const alert = useSelector((state) => state?.alertReducer.alert);


	const styleTheme = () => {
		if (
			location.pathname === routerNames['landing'] ||
			location.pathname === routerNames['login'] ||
			location.pathname === routerNames['register'] ||
			location.pathname === routerNames['loading']
		) {
			return styles.alertDark;
		} else {
			return styles.alertLight;
		}
	};

	const createAlert = (message, type, id) => {
		const alertElement = document.createElement('section');
		alertElement.id = id;
		const alertIcon = document.createElement('img');
		const messageContainer = document.createElement('div');
		const messageDefault = document.createElement('h4');
		const alertMessage = document.createElement('h5');
		const buttonClose = document.createElement('button');
		const crossIcon = document.createElement('img');
		const progressBar = document.createElement('div');
		const progressBarFill = document.createElement('div');

		buttonClose.addEventListener('click', () => {
			let alertElement = document.getElementById(id);
			if (alertElement) {
				alertElement.remove();
			}
		});

		progressBar.classList.add(styles.progressBar);
		progressBarFill.classList.add(styles.progressBarFill);

		alertElement.classList.add(styleTheme());

		alertElement.appendChild(alertIcon);
		alertElement.appendChild(messageContainer);

		messageContainer.appendChild(messageDefault);
		messageContainer.appendChild(alertMessage);

		alertElement.appendChild(buttonClose);
		buttonClose.appendChild(crossIcon);

		alertElement.appendChild(progressBar);
		alertElement.appendChild(progressBarFill);


		crossIcon.src = styleTheme() === styles.alertDark ? crossGrey : cross;
		alertMessage.textContent = message;

		if (type === 'error') {
			alertIcon.src = errorIcon;
			messageDefault.textContent = '¡OMG!';
			alertElement.classList.add(styles.alertError);
		} else if (type === 'success') {
			alertIcon.src = successIcon;
			messageDefault.textContent = '¡Estupendo!';
			alertElement.classList.add(styles.alertSuccess);
		} else if (type === 'warning') {
			alertIcon.src = warningIcon;
			messageDefault.textContent = '¡Cuidadito!';
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
					if (alertElement) {
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
					if (alertElement) {
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
