import styles from './styles.module.scss';
import CardPetPublic from '@src/ui/components/cards/card-pets/CardPetPublic';
import ButtonAgree from '@src/ui/components/forms/form-pet-edit/atoms/ButtonAgree';
import {  useSelector } from 'react-redux';
import useGetMyPets from '@src/common/hooks/useGetMyPets';

const MyPets = () => {
	const userName = useSelector((state) => state.userReducer.user.name);
	const ownerId = useSelector((state) => state.userReducer.user.owner.id);
	const { pets, isLoading } = useGetMyPets(ownerId);
	const isPets = pets.length > 0;


	return (
		<div className={styles.mainContainer}>
			<h1>Mis Mascotas</h1>
			{!isPets &&  <h2>Hola, {userName}<br/> Agrega tu primera mascota para poder empezar</h2>}
			<div className={styles.gridContainer}>

				{!isLoading & isPets && pets.map((pet) => (
					<CardPetPublic key={pet.pet.id} data={pet} />
				))}
				<ButtonAgree />

			</div>
		</div>
	);
};

export default MyPets;
