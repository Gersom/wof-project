import styles from '../styles.module.scss';
import starReview from '@icons/starReview.svg';

const SectionOffer = ({
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
			<section className={styles.sectionOffer}>
				<div>
					<h3>{data.owner.name}</h3>
					<h4>{data.address || data.owner.address}</h4>
					<h5>
						{dateStart} al {dateEnd}.
					</h5>
				</div>
				<footer>
					<img src={starReview} alt='star' />
					<h5>{data.rating ||data.pet.rating} </h5>
				</footer>
			</section>
		</>
	);
};

export default SectionOffer;
