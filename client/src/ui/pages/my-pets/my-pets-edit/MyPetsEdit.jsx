import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/forms/form-pet-edit/FormPetEdit';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';

const MyPetsEdit = () => {
	const { idPet } = useParams();
	return (
		<div className={styles.mainContainer}>
			<h1>Mi mascota: Peluche</h1>
            <div className={styles.gridContainer}>
                <FormPetEdit />
                <CardDisplayImages/>
            </div>
		</div>
	);
};

export default MyPetsEdit;
