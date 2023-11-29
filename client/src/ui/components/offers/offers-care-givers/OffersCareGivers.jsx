import styles from './styles.module.scss';
import CardOffersCaregivers from '../../cards/card-offers-caregivers/CardOffersCaregivers';
import CardInfoPet from '../../cards/card-info/CardInfoPet';
import useGetPetId from '@src/common/hooks/useGetPetId';
import PetImage from '../../cards/card-pets/atoms/PetImage';
import useOffersCaregivers from '@src/common/hooks/useOffersCaregivers';
import { useParams } from 'react-router-dom';

const OffersCareGivers = () => {
	const { id } = useParams();
	const { isLoading, details } = useGetPetId(id);
	const { isLoadingOffers,offersCareGivers } =  useOffersCaregivers(details?.id || null);
	
	return (
		<div className={styles.containerMainGrid}>
			<div className={styles.containerCardInfo}>
				{!isLoading && (
					<PetImage
						data={details}
					/>
				)}
				{!isLoading && (
					<CardInfoPet
						data={details}
                        role={'caregiver'}
					/>
				)}
			</div>
			<div className={styles.containerOffers}>
				{!isLoadingOffers && offersCareGivers.map((offer) => (
					<CardOffersCaregivers
						data={offer}
						key={offer.id}
						rango={'intermedio'}
					/>
				))}
			</div>
		</div>
	);
};

export default OffersCareGivers;
