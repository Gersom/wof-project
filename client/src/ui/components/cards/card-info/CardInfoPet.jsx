import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';
import { convertDates } from '@src/common/utils/converDates';

const CardInfoPet = ({
	data = {
		pet: {
			breed: '',
			temperaments: '',
			manners: '',
			notes: '',
			species: {
				name: '',
				icon: '',
			},
		},
		startDate: '',
		endDate: '',
	},
	role,
}) => {
	const location = useLocation();
	const classRole = role === 'caregiver' ? styles.caregivers : styles.owner;

	const handleRenderDate = () => {
		if (location.pathname.includes('owners/offers')) {
			const { dateStart, dateEnd } = convertDates(data.startDate, data.endDate);
			return (
				<div className={styles.datesContainer}>
					<section>
						<h4>Desde:</h4>
						<h5>{dateStart}</h5>
					</section>
					<section>
						<h4>Hasta:</h4>
						<h5>{dateEnd}</h5>
					</section>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<article className={`${styles.article}  ${classRole}`}>
			<h3>Información</h3>
			{handleRenderDate()}
			<div className={styles.info}>
				<h4>Raza :</h4>
				<h5>
					<span>{data.pet.species.icon}</span>{' '}
					{data.pet.breed.name || data.pet.breed}
				</h5>
			</div>
			<div className={styles.info}>
				<h4>Temperamento :</h4>
				<h5>{data.pet.temperaments}</h5>
			</div>
			<div className={styles.info}>
				<h4>Modales :</h4>
				<h5>{data.pet.manners} </h5>
			</div>
			<div className={styles.info}>
				<h4>Nota :</h4>
				<h5>{data.pet.notes}</h5>
			</div>
		</article>
	);
};

export default CardInfoPet;
