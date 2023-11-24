import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import FormPetEdit from '@src/ui/components/form-pet-edit/FormPetEdit';
const MyPetsEdit = () => {
	const { idPet } = useParams();
	return (
		<div className={styles.mainContainer}>
			<h1>Mi mascota: Peluche</h1>
            <div className={styles.gridContainer}>
                <FormPetEdit />
                <h1>Tukis</h1>
            </div>
		</div>
	);
};

export default MyPetsEdit;
