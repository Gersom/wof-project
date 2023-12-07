import styles from '../styles.module.scss';
import FooterDates from './FooterDates';
import eyeBlue from '@icons/eyeBlue.svg';

const SectionDefault = ({ data, toggleModal }) => {
	return (
		<section className={styles.sectionPublic}>
			<h3>En busca de un cuidador:</h3>
			<div className={styles.containerInfo}>
				<button className={styles.buttonDefault} onClick={toggleModal}>
					<img src={eyeBlue} alt='eyeBlue' />
					Publicar
				</button>
			</div>
			<FooterDates  />
		</section>
	);
};

export default SectionDefault;
