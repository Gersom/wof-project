import styles from './styles.module.scss';
import starReview from '@icons/starReview.svg';
function CardOffersOwner({
	petName,
	petImg,
	address,
	ownerName,
	ownerIdm,
	time,
	reviewRating,
}) {
	return (
		<article className={styles.article}>
			<figure>
				<img src={petImg} alt={petName} />
				<figcaption>{petName}</figcaption>
			</figure>
			<section>
				<div>
					<h3>{ownerName}</h3>
					<h4>{address}</h4>
					<h5>{time}</h5>
				</div>
				<footer>
                    <img src={starReview} alt="star" />
					<h5>{reviewRating}</h5>
				</footer>
			</section>
		</article>
	);
}

export default CardOffersOwner;
