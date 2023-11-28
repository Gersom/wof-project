import styles from '../styles.module.scss';
import editWhite from '@icons/editWhite.svg';

const PetImage = ({
	data = {
		pet: { imageUrl: '', name: '' },
	},
	isEditable = false,
}) => {
	const styleImage = isEditable ? styles.imageEditable : '';
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
					<button className={styles.buttonEditAbsolute}>
						<img src={editWhite} alt='editWhite' />
						Editar
					</button>
				)}
			</figure>
		</>
	);
};

export default PetImage;
