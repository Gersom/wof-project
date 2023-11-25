import styles from '../styles.module.scss';
import starReview from '@icons/starReview.svg';

const PetInfo = ({
	data = {
		owner: { name: '' },
		address: '',
		startDate: '',
		endDate: '',
		rating: 0,
	},
}) => {
	const dateStart = new Date(data.startDate).toLocaleDateString('es-ES', {
		day: 'numeric',
	});
	const dateEnd = new Date(data.endDate).toLocaleDateString('es-ES', {
		month: 'long',
		day: 'numeric',
	});

	return (
		<>
			<section className={styles.sectionInfo}>
				<div>
					<h3>{data.owner.name}</h3>
					<h4>{data.address}</h4>
					<h5>
						{dateStart} al {dateEnd}.
					</h5>
				</div>
				<footer>
					<img src={starReview} alt='star' />
					<h5>{data.rating} </h5>
				</footer>
			</section>
		</>
	);
};

export default PetInfo;
