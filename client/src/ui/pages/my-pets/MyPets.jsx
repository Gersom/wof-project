import styles from './styles.module.scss';
import CardPetPublic from '@src/ui/components/cards/card-pets/CardPetPublic';
import ButtonAgree from '@src/ui/components/forms/form-pet-edit/atoms/ButtonAgree';
import ModalCustom from '@src/ui/components/modals/modal-custom/ModalCustom';
import ModalPublicPet from '@src/ui/components/modals/modal-public-pet/ModalPublicPet';
import { useState } from 'react';

const MyPets = () => {
	const [modal, setModal] = useState(!false);

	return (
		<div className={styles.mainContainer}>
			<h1>Mis Mascotas</h1>
			<div className={styles.gridContainer}>
				<CardPetPublic />
				<ButtonAgree />
			</div>
			<ModalCustom
				isWarning={false}
				state={modal}
				toggleModal={() => setModal(!modal)}
			>
				<ModalPublicPet/>
			</ModalCustom>
		</div>
	);
};

export default MyPets;
