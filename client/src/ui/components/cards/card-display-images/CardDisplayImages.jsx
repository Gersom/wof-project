import styles from './styles.module.scss';
import image from '@icons/image.svg';

const CardDisplayImages = ({ data }) => {
	return (
		<div className={styles.mainContainer}>
            <h4>Fotos de la masconta</h4>
			<header>
				<img src={image} alt='pet' />
				<h3>Fotos :</h3>
			</header>
			<div>
				<img src='https://via.placeholder.com/150' alt='pet' />
                <img src='https://via.placeholder.com/150' alt='pet' />
                <img src='https://via.placeholder.com/150' alt='pet' />
                <img src='https://via.placeholder.com/150' alt='pet' />
                <img src='https://via.placeholder.com/150' alt='pet' />
                <img src='https://via.placeholder.com/150' alt='pet' />
			</div>
		</div>
	);
};

export default CardDisplayImages;
