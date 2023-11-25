import styles from './styles.module.scss';
import CardOffersCaregivers from '../../cards/card-offers-caregivers/CardOffersCaregivers';
import CardInfoPet from '../../cards/card-info/CardInfoPet';
import useGetDetails from '@src/common/hooks/useGetDetails';
import CardOffersOwner from '../../cards/card-pets/CardOffersOwner';
import useOffersCaregivers from '@src/common/hooks/useOffersCaregivers';

const OffersCareGivers = () => {
	const { isLoadingOffers,offersCareGivers } = useOffersCaregivers();
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
                        role={'caregiver'}
					/>
				)}
			</div>
			<div className={styles.containerOffers}>
				{!isLoadingOffers && offersCareGivers.map((offer, index) => (
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
