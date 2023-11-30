import styles from '../styles.module.scss';
import FooterDates from './FooterDates';
import searchBlue from '@icons/searchBlue.svg';
import editBlue from '@icons/editBlue.svg';
import { useNavigate } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';
const SectionPublished = ({ data, toggleModal }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(routerNames['offersOwners'] + data.id);
	};
	return (
		<section className={styles.sectionPublic}>
			<h3>En busca de un cuidador:</h3>
			<div className={styles.containerInfo}>
				<button className={styles.buttonSearch} onClick={handleNavigate}>
					<img src={searchBlue} alt='search' />
					Buscar
				</button>
				<button className={styles.buttonEdit} onClick={toggleModal}>
					<img src={editBlue} alt='edit' />
					Editar
				</button>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionPublished;
