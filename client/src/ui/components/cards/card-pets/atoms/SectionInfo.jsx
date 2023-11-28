import styles from '../styles.module.scss';

const SectionInfo = ({
	data = {
		pet: {
			breed: '',
			manners: '',
		},
	},
}) => {
	return (
		<section className={styles.sectionInfo}>
			<h5>Informacion :</h5>
			<h4>{data.pet.breed}</h4>
			<h4>{data.pet.manners}</h4>
		</section>
	);
};

export default SectionInfo;
