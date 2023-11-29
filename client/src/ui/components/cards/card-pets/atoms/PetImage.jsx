import styles from '../styles.module.scss';
import editWhite from '@icons/editWhite.svg';
import { useNavigate } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';

const PetImage = ({
	data = {
		pet: { imageUrl: '', name: '', id: 0 },
	},
	isEditable = false,
}) => {
	const navigate = useNavigate();
	const styleImage = isEditable ? styles.imageEditable : '';
	
	const handleNavigate = () => {
		navigate(routerNames['myPetsEdit'] + data.pet.id);
	}
	return (
		<>
			<figure className={styles.figure}>
				<img
					src={data.pet.imageUrl}
					alt={data.pet.name}
					className={styleImage}
				/>
				<figcaption>{data.pet.name || data.name}</figcaption>
				{isEditable && (
					<button
						className={styles.buttonEditAbsolute}
						onClick={handleNavigate}
					>
						<img src={editWhite} alt='editWhite' />
						Editar
					</button>
				)}
			</figure>
		</>
	);
};

export default PetImage;
