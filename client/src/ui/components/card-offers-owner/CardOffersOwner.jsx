import styles from './styles.module.scss';
import starReview from '@icons/starReview.svg';
import { Link } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';
const CardOffersOwner = ({
	petName,
	petImg,
	address,
	ownerName,
	ownerId,
	petId,
	startDate,
	endDate,
	reviewRating,
}) => {
	const dateStart = new Date(startDate).toLocaleDateString('es-ES', {day : 'numeric'});
	const dateEnd = new Date(endDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
	console.log(petId);
	return (
		<Link to={routerNames['details'] + petId} className={styles.link}>
		<article className={styles.article}>
			<figure>
				<img src={petImg} alt={petName} />
				<figcaption>{petName}</figcaption>
			</figure>
			<section>
				<div>
					<h3>{ownerName}</h3>
					<h4>{address}</h4>
					<h5>{dateStart} al {dateEnd}.</h5>
				</div>
				<footer>
                    <img src={starReview} alt="star" />
					<h5>{reviewRating} </h5>
				</footer>
			</section>
		</article>
		</Link>
	);
}

export default CardOffersOwner;
