import styles from './styles.module.css';

const CardOffersCaregivers = ({
	name,
	rango,
	imgSrc,
	address,
	price,
	rating,
}) => {
	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<img src={imgSrc} alt='Foto de perfil' className={styles.imgProfile}/>
				<div className={styles.containerData}>
					<h3>{name}</h3>
					<h5>{rango}</h5>
					<h4>{address}</h4>
					<h3>{price}</h3>
				</div>
				<span>{rating}</span>
			</header>
			<div className={styles.containerButtons}>
				<button>Aceptar</button>
				<button>Detalles</button>
			</div>
		</section>
	);
};

export default CardOffersCaregivers;
