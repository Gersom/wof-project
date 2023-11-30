import styles from './styles.module.scss';
import starReview from '@icons/starReview.svg';
import { useNavigate } from 'react-router-dom';
import routerNames from '@src/common/constants/routes';

const CardOffersCaregivers = ({
	rango,
	data = {
		name: '',
		profilePicture: '',
		address: '',
		price: '',
		rating: 0,
		caregiverId: 1,
	},
  setData=()=>null
}) => {
	const navigate = useNavigate();
	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<figure className={styles.figure}>
					<img
						src={data.profilePicture}
						alt='Foto de perfil'
						className={styles.imgProfile}
					/>
				</figure>
				<div className={styles.containerData}>
					<h2>{data.name}</h2>
					<h5>{rango}</h5>
					<h4>{data.address}</h4>
					<h3>{data.price}</h3>
				</div>
				<div className={styles.containerReview}>
					<img src={starReview} alt='star' />
					<span>{data.rating}</span>
				</div>
			</header>
			<div className={styles.containerButtons}>
				<button className={styles.buttonAccept}
        onClick={()=>setData(data)}>
          Aceptar
        </button>
				<button 
        className={styles.buttonDetail} 
        onClick={() => navigate(routerNames['detailsOwners'] + data.caregiverId)}>
          Detalles
        </button>
			</div>
		</section>
	);
};

export default CardOffersCaregivers;
