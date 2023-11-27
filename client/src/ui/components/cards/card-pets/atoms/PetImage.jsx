import styles from '../styles.module.scss';

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
				<img src={data.pet.imageUrl} alt={data.pet.name} className={styleImage}/>
				<figcaption>{data.pet.name}</figcaption>
				{isEditable && <button className={styles.buttonEdit}>Editar</button>}
			</figure>
		</>
	);
};

export default PetImage;
