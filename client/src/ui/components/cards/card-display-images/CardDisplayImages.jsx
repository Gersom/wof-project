import styles from './styles.module.scss';
import imageIcon from '@icons/imageIcon.svg';
import ButtonAgree from './atoms/ButtonAgree';

const CardDisplayImages = ({
	data = [
		{
			id: 0,
			imageUrl: '',
			petId: 0,
		},
	],
}) => {
	return (
		<div className={styles.mainContainer}>
			<h4>Fotos de la masconta</h4>
			<header>
				<img src={imageIcon} alt='pet' />
				<h3>Fotos :</h3>
			</header>
			<div>
				{data.map((image) => (
					<img src={image.imageUrl} alt='pet' key={image.id} />
				))}
				<ButtonAgree />
			</div>
		</div>
	);
};

export default CardDisplayImages;
