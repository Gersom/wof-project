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
	const { isLoadingOffers, offersCareGivers } = useOffersCaregivers(
		details?.id || null
	);
	
	return (
		<div className={styles.containerMainGrid}>
			<div className={styles.containerCardInfo}>
				{details ? (
					!isLoading && (
						<>
							<PetImage data={details} />
							<CardInfoPet data={details} role={'caregiver'} />{' '}
						</>
					)
				) : (
					<h1>Parece que no se ha encontrado la mascota</h1>
				)}
			</div>
			<div className={styles.containerOffers}>
				{offersCareGivers.length === 0 ? (
					<h1>Aun no has recibido ofertas</h1>
				) : (
					!isLoadingOffers &&
					offersCareGivers.map((offer) => (
						<CardOffersCaregivers
							data={offer}
							key={offer.id}
							rango={'intermedio'}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default OffersCareGivers;
