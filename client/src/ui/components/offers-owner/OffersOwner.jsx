import styles from './styles.module.scss';
import CardOffersOwner from '../card-offers-owner/CardOffersOwner';
import useOffersOwner from '@src/common/hooks/useOffersOwner';

function OffersOwner() {
	const { offersOwner } = useOffersOwner();
	return (
		<div className={styles.container}>
			{offersOwner.map((offer, index) => (
				<CardOffersOwner
					key={index}
					petName={offer.pet.name}
					petImg={offer.pet.imageUrl}
					petId={offer.pet.id}
					address={offer.address}
					ownerName={offer.owner.name}
					startDate={offer.startDate}
					endDate={offer.endDate}
					ownerId={offer.owner.id}
					time={offer.time}
					reviewRating={offer.rating}
				/>
			))}
		</div>
	);
}

export default OffersOwner;
