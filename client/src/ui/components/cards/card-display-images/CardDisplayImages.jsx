import styles from './styles.module.scss';
import imageIcon from '@icons/imageIcon.svg';
import ButtonAgree from './atoms/ButtonAgree';
import imageWhite from '@icons/imageWhite.svg';
import deleteWhite from '@icons/deleteWhite.svg';
import ModalCustom from '../../modals/modal-custom/ModalCustom';

import { useState } from 'react';

const CardDisplayImages = ({
	data = [''],
	imagesLocal= [''],
	setImage,
	handleDeleteImage,
	setImagesFiles,
}) => {
	const [modal, setModal] = useState(false);
	const [imageSelected, setImageSelected] = useState('');

	const handleViewImage = (image) => {
		setImageSelected(image);
		setModal(!modal);
	};

	return (
		<>
			<div className={styles.mainContainer}>
				<h4>Fotos de la masconta</h4>
				<header>
					<img src={imageIcon} alt='pet' />
					<h3>Fotos :</h3>
				</header>
				<div>
					{[...data,...imagesLocal].map((image, index) => (
						<figure key={index}>
							<img src={image} alt='pet' key={index} />
							<figcaption>
								<button
									className={styles.minFix}
									onClick={() => handleViewImage(image)}
								>
									<img src={imageWhite} alt='imageWhite' />
									Ver
								</button>
								<button onClick={() => handleDeleteImage(image)}>
									<img src={deleteWhite} alt='imageWhite' />
									Eliminar
								</button>
							</figcaption>
						</figure>
					))}
					<ButtonAgree setImage={setImage} setImagesFiles={setImagesFiles} />
				</div>
			</div>
			<ModalCustom
				state={modal}
				toggleModal={() => setModal(!modal)}
				isWarning={true}
			>
				<div className={styles.viewImage}>
					<img src={imageSelected} alt='image' />
				</div>
			</ModalCustom>
		</>
	);
};

export default CardDisplayImages;
