import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import PetImage from '../../cards/card-pets/atoms/PetImage';
import CardOffersCaregivers from '../../cards/card-offers-caregivers/CardOffersCaregivers';
import { API_URL_SERVICES_ALL } from '@src/common/constants/api';
import ModalCustom from '@components/modals/modal-custom/ModalCustom';
import ModalPayment from '@components/modals/modal-payment/ModalPayment';
import { deletePosts } from '@src/common/store/slices/myPetsSlice';
import { getPets } from '@src/common/utils/helpers-redux/myPets';
import { getMyPets } from '@src/common/store/slices/myPetsSlice';
import { setAlert } from '@src/common/store/slices/alertSlice';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';

const OffersCaregivers = () => {
  const dispatch = useDispatch();
	const [offers, setOffers] = useState([]);
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
	const myPets = useSelector((state) => state?.myPetsReducer?.myPets);
	const ownerId = useSelector((state) => state?.userReducer?.user?.owner?.id)
  const { sendMessage } = useWsOwner('owner');

  const successPaid = async () => {
		setModalState(false);
		dispatch(deletePosts(offerData.id));
		const pets = await getPets(ownerId);
		dispatch(deletePosts(offerData.id));
		dispatch(getMyPets(pets));
		dispatch(
			setAlert({ message: 'Pago realizado con exito 👌', type: 'success' })
		);
		const petSelect = myPets.find((pet) => pet.id == offerData.id);
		
		sendMessage({ type: 'payment_complete', petName: petSelect?.pet?.name , ownerName: petSelect?.owner?.name, caregiverId : offerData.caregiverId});
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



	useEffect(() => {
		const postsId = myPets.map((pet) => pet.id);
		let options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postsId: postsId }),
		};
		const getOffers = async () => {
			const response = await fetch(`${API_URL_SERVICES_ALL}`, options);
			const data = await response.json();
			if (data.length > 0) setOffers(data);
			else setOffers([]);
		};
		getOffers();
	}, [myPets]);

	const renderOffers = () => {
		let petsPublished = myPets.filter((pet) => pet.status === 'published');

		petsPublished = petsPublished.map((pet) => {
			const offersPet = offers.filter((offer) => offer.id === pet.id) || [];
			return (
				<div className={styles.mainCont} key={pet.id}>
					<figure className={styles.figImage}>
						<PetImage data={pet} />
					</figure>
					<div className={styles.contOffers}>
						{offersPet.length > 0 ? (
							offersPet.map((offer) => {
								return (
									<CardOffersCaregivers
										data={{...offer, id: offer.id.toString()}}
										key={offer.caregiverId}
										rango={'intermedio'}
                    setData={onClickAccept}
									/>
								);
							})
						) : (
							<h1>No hay ofertas para esta mascota</h1>
						)}
					</div>
				</div>
			);
		});
		if (petsPublished.length === 0)
			return <h1>No tienes mascotas publicadas</h1>;
		return petsPublished;
	};
	return (
		<>
			<div className={styles.contPrinc}>
				<h1>Cuidadores para tus mascotas</h1>
				{renderOffers()}
			</div>
			<ModalCustom state={modalState} toggleModal={() => setModalState(false)}>
				<ModalPayment successPaid={successPaid} data={offerData} />
			</ModalCustom>
		</>
	);
};

export default OffersCaregivers;
