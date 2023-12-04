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
	const imgNotFound = 'https://imgs.search.brave.com/pDeUtEKVyuoW_2EWBMeDdN_uMO_7x54kvcqj9WU6rH4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaG9sYS5jb20v/aW1hZ2VuZXMvbWFz/Y290YXMvMjAyMzA4/MTAyMzcxNzUvNy1y/YXphcy1kZS1wZXJy/by1xdWUtYWRvcmFu/LWVsLWFndWEvMS0y/OTEtNzM1L3BlcnJv/LWFndWEtdC5qcGc_/dHg9d180MDA';

	return (
		<>
			<figure className={styles.figure}>
				<img
					src={data.pet.imageUrl || data.pet.images[0] || imgNotFound }
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
