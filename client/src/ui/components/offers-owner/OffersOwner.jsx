import styles from './styles.module.scss';
import CardOffersOwner from '../card-offers-owner/CardOffersOwner';
import useOffersOwner from '@src/common/hooks/useOffersOwner';

function OffersOwner() {
	const offers = useOffersOwner();
	const slicedOffers = offers.slice(0, 3);

	return (
		<div className={styles.container}>
			{slicedOffers.map((offer, index) => (
				<CardOffersOwner
					key={index}
					petName={offer.petName}
					petImg={offer.petImg}
					address={offer.address}
					ownerName={offer.owner.name}
					ownerId={offer.owner.id}
					time={offer.time}
					reviewRating={offer.reviewRating}
				/>
			))}
		</div>
	);
}

export default OffersOwner;
