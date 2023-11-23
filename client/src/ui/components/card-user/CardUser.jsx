import styles from './styles.module.scss';
import starReview from '@icons/starReview.svg';
function CardUser({ name, role, address, rating, imgSrc }) {
	const rol = role === 'owner' ? 'Dueño' : 'Cuidador';
	return (
		<article className={styles.article}>
			<figure>
				<img src={imgSrc} alt={`${name} profile picture`} />
				<figcaption>
					<h3>{name}</h3>
					<h4>{rol}</h4>
				</figcaption>
			</figure>
			<footer>
				<h4>{address}</h4>
				<div>
					<h5>Puntuación :</h5>
					<img src={starReview} alt='starReview' />
					<h4>{rating}</h4>
				</div>
			</footer>
		</article>
	);
}

export default CardUser;
