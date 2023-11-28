import styles from '../styles.module.scss';
import FooterDates from './FooterDates';

const SectionDefault = ({data}) => {
	return (
		<section className={styles.sectionPublic}>
			<h3>En busca de un cuidador:</h3>
			<div className={styles.containerInfo}>
				<button>Publicar</button>
			</div>
			<FooterDates data={data} />
		</section>
	);
};

export default SectionDefault;
