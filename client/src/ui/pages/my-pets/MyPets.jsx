import styles from './styles.module.scss';
import CardPetPublic from '@src/ui/components/cards/card-pets/CardPetPublic';
const MyPets = () => {
	return (
		<div className={styles.mainContainer}>
			<h1>Mis Mascotas</h1>
			<div>
				<CardPetPublic />
			</div>
		</div>
	);
};

export default MyPets;
