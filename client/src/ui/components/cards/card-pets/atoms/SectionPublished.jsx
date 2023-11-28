import styles from '../styles.module.scss';
import FooterDates from './FooterDates';
import searchBlue from '@icons/searchBlue.svg';
import editBlue from '@icons/editBlue.svg';

const SectionPublished = ({ data }) => {
	return (
		<section className={styles.sectionPublic}>
			<h3>En busca de un cuidador:</h3>
			<div className={styles.containerInfo}>
				<button className={styles.buttonSearch}>
					<img src={searchBlue} alt='search' />
					Buscar
				</button>
				<button className={styles.buttonEdit}>
					<img src={editBlue} alt='edit' />
					Editar</button>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionPublished;
