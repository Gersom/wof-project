import styles from './styles.module.scss';
import imageIcon from '@icons/imageIcon.svg';
import ButtonAgree from './atoms/ButtonAgree';

const CardDisplayImages = ({ data }) => {

	
	return (
		<div className={styles.mainContainer}>
			<h4>Fotos de la masconta</h4>
			<header>
				<img src={imageIcon} alt='pet' />
				<h3>Fotos :</h3>
			</header>
			<div>
				<img src='https://via.placeholder.com/150' alt='pet' />
				<img src='https://via.placeholder.com/150' alt='pet' />
				<img src='https://via.placeholder.com/150' alt='pet' />
				<ButtonAgree />
			</div>
		</div>
	);
};

export default CardDisplayImages;
