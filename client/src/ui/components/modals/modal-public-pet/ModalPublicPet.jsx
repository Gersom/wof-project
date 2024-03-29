import styles from './styles.module.scss';
import CardPetInfo from '../../cards/card-pets/CardPetInfo';
import DatePublicSelect from '@components/date-public-select/DatePublicSelect';

const ModalPublicPet = ({ data, toggleModal }) => {
	return (
		<div className={styles.modalContainer}>
			<h1>Anuncia a tu mascota</h1>
			<h3>
				Estas a un paso de encontrar un cuidador para tu mascota, completa el
				formulario para seguir
			</h3>
			<div>
				<CardPetInfo  data={data}/>
				<DatePublicSelect  data={data} toggleModal={toggleModal}/>
			</div>
		</div>
	);
};

export default ModalPublicPet;
