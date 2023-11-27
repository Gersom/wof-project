import styles from '../styles.module.scss';
import FooterDates from './FooterDates';

const SectionPublished = ({ data }) => {
	return (
		<section className={styles.sectionPublic}>
			<h3>En busca de un cuidador:</h3>
			<div className={styles.containerInfo}>
				<button>Buscar</button>
				<button>Editar</button>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionPublished;
