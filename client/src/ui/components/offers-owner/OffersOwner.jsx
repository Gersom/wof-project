import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { getOffersOwner } from '@src/common/utils/getOffersOwner';
import CardOffersOwner from '../card-offers-owner/CardOffersOwner';
function OffersOwner() {
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		const getOffers = async () => {
			const offers = await getOffersOwner();
			setOffers(offers);
		};
		getOffers();
	}, []);
	return (
		<div className={styles.container}>
			{offers.slice(0, 3).map((offer, index) => (
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
