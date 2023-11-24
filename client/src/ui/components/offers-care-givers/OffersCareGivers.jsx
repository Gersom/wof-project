import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import CardOffersCaregivers from '../card-offers-caregivers/CardOffersCaregivers';
import { getOffersCareGivers } from '@src/common/utils/getOffersCareGivers';
import CardInfoPet from '../card-info/CardInfoPet';
import useGetDetails from '@src/common/hooks/useGetDetails';
import CardOffersOwner from '../card-offers-owner/CardOffersOwner';
const OffersCareGivers = () => {
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		const getOffers = async () => {
			const offers = await getOffersCareGivers();
			setOffers(offers);
		};
		getOffers();
	}, []);
	const { isLoading, details } = useGetDetails(1);
	return (
		<div className={styles.containerMainGrid}>
			<div className={styles.containerCardInfo}>
				{!isLoading && (
					<CardOffersOwner
						address={details.owner.address}
						petName={details.pet.name}
                        startDate={details.startDate}
						endDate={details.endDate}
                        ownerName={details.owner.name}
                        petId={details.pet.id}
                        ownerId={details.owner.id}
                        petImg={details.pet.images[0]}
                        reviewRating={details.owner.rating}
                    
					/>
				)}
				{!isLoading && (
					<CardInfoPet
						breed={details.pet.breed}
						manners={details.pet.manners}
						temperaments={details.pet.temperaments}
						notes={details.pet.notes}
                        role={'cuidador'}
					/>
				)}
			</div>
			<div className={styles.containerOffers}>
				{offers.slice(0, 3).map((offer, index) => (
					<CardOffersCaregivers
						key={index}
						name={offer.name}
						rango={offer.experiencie}
						imgSrc={offer.imgProfile}
						address={offer.address}
						price={offer.price}
						rating={offer.rating}
					/>
				))}
			</div>
		</div>
	);
};

export default OffersCareGivers;
