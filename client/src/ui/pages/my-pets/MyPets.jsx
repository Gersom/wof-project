import styles from './styles.module.scss';
import CardPetPublic from '@src/ui/components/cards/card-pets/CardPetPublic';
import ButtonAgree from '@src/ui/components/forms/form-pet-edit/atoms/ButtonAgree';

const MyPets = () => {
	return (
		<div className={styles.mainContainer}>
			<h1>Mis Mascotas</h1>
			<div className={styles.gridContainer}>
				<CardPetPublic />
				<ButtonAgree />
			</div>
		</div>
	);
};

export default MyPets;
