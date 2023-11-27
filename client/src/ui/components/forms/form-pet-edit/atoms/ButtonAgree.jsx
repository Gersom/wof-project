import { useNavigate } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';
import plusAgree from '@icons/plusAgree.svg';
import styles from './styles.module.scss';

const ButtonAgree = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.buttonAgree}>
			<button
				onClick={() => navigate(routerNames['myPetsCreate'])}
        className={styles.buttonAgree}
			>
				<img src={plusAgree} alt='Agregar' />
				Agregar
			</button>
		</div>
	);
};

export default ButtonAgree;
