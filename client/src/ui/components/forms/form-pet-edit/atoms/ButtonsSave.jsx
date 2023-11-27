import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';

const ButtonsSave = ({ onSubmit }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.buttonContainer}>
			<button onClick={onSubmit} type='submit'>
				Guardar cambios
			</button>
			<button onClick={() => navigate(routerNames['myPets'])}>Regresar</button>
		</div>
	);
};

export default ButtonsSave;
