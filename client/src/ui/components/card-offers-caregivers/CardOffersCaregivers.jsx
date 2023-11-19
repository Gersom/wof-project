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
				<figure className={styles.figure}>
					<img
						src={imgSrc}
						alt='Foto de perfil'
						className={styles.imgProfile}
					/>
				</figure>
				<div className={styles.containerData}>
					<h3>{name}</h3>
					<h5>{rango}</h5>
					<h4>{address}</h4>
					<h3>{price}</h3>
				</div>
				<span>{rating}</span>
			</header>
			<div className={styles.containerButtons}>
				<button className={styles.buttonAccept}>Aceptar</button>
				<button className={styles.buttonDetail}>Detalles</button>
			</div>
		</section>
	);
};

export default CardOffersCaregivers;
