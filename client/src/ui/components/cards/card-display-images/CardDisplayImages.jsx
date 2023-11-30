import styles from './styles.module.scss';
import imageIcon from '@icons/imageIcon.svg';
import ButtonAgree from './atoms/ButtonAgree';

const CardDisplayImages = ({ data = [''], setImage }) => {
	return (
		<div className={styles.mainContainer}>
			<h4>Fotos de la masconta</h4>
			<header>
				<img src={imageIcon} alt='pet' />
				<h3>Fotos :</h3>
			</header>
			<div>
				{data.map((image, index) => (
					<img src={image} alt='pet' key={index} />
				))}
				<ButtonAgree setImage={setImage} />
			</div>
		</div>
	);
};

export default CardDisplayImages;
