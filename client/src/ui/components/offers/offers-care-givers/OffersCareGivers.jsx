import styles from './styles.module.scss';
import CardOffersCaregivers from '../../cards/card-offers-caregivers/CardOffersCaregivers';
import CardInfoPet from '../../cards/card-info/CardInfoPet';
import useGetPetId from '@src/common/hooks/useGetPetId';
import PetImage from '../../cards/card-pets/atoms/PetImage';
import useOffersCaregivers from '@src/common/hooks/useOffersCaregivers';
import { useParams } from 'react-router-dom';
import ModalCustom from '@components/modals/modal-custom/ModalCustom';
import ModalPayment from '@components/modals/modal-payment/ModalPayment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePetsTriger } from '@common/store/slices/myPetsSlice';

const OffersCareGivers = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { isLoading, details } = useGetPetId(id);
	const { isLoadingOffers, offersCareGivers } = useOffersCaregivers(
		details?.id || null
	);

	const [modalState, setModalState] = useState(false);
	const [offerData, setOfferData] = useState({
		id: 0,
		price: '1.00',
		caregiverId: 0,
		userId: 0,
		name: '..',
		address: '...',
		profilePicture: '...',
		rating: '...',
	});

	const successPaid = () => {
		setModalState(false);
		setOfferData({
			id: 0,
			price: '1.00',
			caregiverId: 0,
			userId: 0,
			name: '..',
			address: '...',
			profilePicture: '...',
			rating: '...',
		});

		dispatch(updatePetsTriger());
	};

	const onClicAccep = (data) => {
		setOfferData(data);
		setModalState(true);
	};

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
							setData={onClicAccep}
						/>
					))
				)}
			</div>

			<ModalCustom state={modalState} toggleModal={() => setModalState(false)}>
				<ModalPayment successPaid={successPaid} data={offerData} />
			</ModalCustom>
		</div>
	);
};

export default OffersCareGivers;
