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
import {
	getMyPets,
	setPosts,
	deletePosts,
} from '@common/store/slices/myPetsSlice';
import { getPets } from '@src/common/utils/helpers-redux/myPets';
import { setAlert } from '@src/common/store/slices/alertSlice';
import CareInProgress from '../../care-in-progress/CareInProgress';
import CardUser from '../../cards/card-user/CardUser';
import CardInfoCaregiver from '../../cards/card-info-caregiver/CardInfoCaregiver';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';
import { API_URL_CHAT } from '@src/common/constants/api';

const OffersCaregiversDetail = () => {
	const dispatch = useDispatch();
	const { sendMessageOwner } = useWsOwner('owner');
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

	const successPaid = async () => {
		setModalState(false);

		const pets = await getPets(details?.owner?.id);
		dispatch(deletePosts(details?.id));
		dispatch(getMyPets(pets));
		dispatch(
			setAlert({ message: 'Pago realizado con exito 👌', type: 'success' })
		);
		sendMessageOwner({
			type: 'payment_complete',
			petName: details?.pet?.name,
			ownerName: details?.owner?.name,
			caregiverId: offerData.caregiverId,
		});

		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ownerId: details?.owner?.id,
				caregiverId: offerData.caregiverId,
			}),
		};
		await fetch(`${API_URL_CHAT}`, options);

		sendMessageOwner({
			type: 'update_message',
			ownerId: details?.owner?.id,
			caregiverId: offerData?.caregiverId,
		});
		
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
	};

	const onClickAccept = (data) => {
		setOfferData(data);
		setModalState(true);
	};

	const onClickDetails = () => {
		dispatch(setPosts(details.id));
	};

	const renderOffers = () => {
		return (
			<>
				{!isLoading && !isLoadingOffers && offersCareGivers.length === 0 ? (
					<h3 className={styles.h3NoOffers}><span>¡Ups!</span> <br/>Todavía no has recibido ofertas de cuidadores para esta mascota</h3>
				) : (
					offersCareGivers.map((offer) => (
						<CardOffersCaregivers
							data={offer}
							key={offer.id}
							rango={'intermedio'}
							setData={onClickAccept}
							setIdPost={onClickDetails}
						/>
					))
				)}
			</>
		);
	};

	const styleContainer =
		details?.status !== 'paid'
			? styles.containerMainGrid
			: styles.containerPaid;

	return (
		<div className={styleContainer}>
			{details?.status !== 'paid' ? (
				<>
					<div className={styles.containerCardInfo}>
						{!isLoading && details ? (
							<>
								<PetImage data={details} />
								<CardInfoPet data={details} role={'caregiver'} />{' '}
							</>
						) : (
							<h1>Parece que no se ha encontrado la mascota</h1>
						)}
					</div>
					<div className={styles.containerOffers}>{renderOffers()}</div>
				</>
			) : (
				<>
					<CareInProgress
						endDate={details?.endDate}
						startDate={details?.startDate}
						image={details?.pet.imageUrl}
						petName={details?.pet.name}
						postId={id}
						caregiverId={details?.caregiver.id}
						ownerId={details?.owner?.id}
					/>
					<div className={styles.containerInfoCaregiver}>
						<CardUser
							imgSrc={details?.caregiver.profilePicture}
							address={details?.caregiver.address}
							name={details?.caregiver.name}
							rating={details?.caregiver.rating}
							role={'caregiver'}
						/>
						<CardInfoCaregiver data={details?.caregiver} />
					</div>
				</>
			)}
			<ModalCustom state={modalState} toggleModal={() => setModalState(false)}>
				<ModalPayment successPaid={successPaid} data={offerData} />
			</ModalCustom>
		</div>
	);
};

export default OffersCaregiversDetail;
