import styles from '../styles.module.scss';

const FooterDates = ({
	data = {
		startDate: '',
		endDate: '',
	},
}) => {
    const startDate = '20 de nov 2023';
    const endDate = '22 de nov 2023';
	const renderDates = () => {
		if (startDate && endDate) {
			return (
				<>
					<div>
						<h4>Desde: </h4>
						<h4>{startDate}</h4>
					</div>
					<div>
						<h4>Hasta: </h4>
						<h4>{endDate}</h4>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div>
						<h4>Fecha: </h4>
						<h4>Sin definir todavia</h4>
					</div>
				</>
			);
		}
	};
	return (
		<>
			<footer className={styles.footerDates}>{renderDates()}</footer>
		</>
	);
};

export default FooterDates;
