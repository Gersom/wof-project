import styles from './styles.module.scss';
import CardOffersCaregivers from '../../cards/card-offers-caregivers/CardOffersCaregivers';
import CardInfoPet from '../../cards/card-info/CardInfoPet';
import useGetDetails from '@src/common/hooks/useGetDetails';
import useGetPetId from '@src/common/hooks/useGetPetId';
import CardOffersOwner from '../../cards/card-pets/CardOffersOwner';
import useOffersCaregivers from '@src/common/hooks/useOffersCaregivers';
import { useParams } from 'react-router-dom';

const OffersCareGivers = () => {
	const { id } = useParams();
	const { isLoadingOffers,offersCareGivers } = useOffersCaregivers();
	const { isLoading, details } = useGetPetId(id);
	
	return (
		<div className={styles.containerMainGrid}>
			<div className={styles.containerCardInfo}>
				{!isLoading && (
					<CardOffersOwner
						data={details}
					/>
				)}
				{!isLoading && (
					<CardInfoPet
						breed={details.pet.breed.name}
						manners={details.pet.manners}
						temperaments={details.pet.temperaments}
						notes={details.pet.notes}
                        role={'caregiver'}
						startDate={details.startDate}
						endDate={details.endDate}
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
