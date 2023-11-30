import styles from '../styles.module.scss';
import { convertDates } from '@src/common/utils/converDates';

const FooterDates = ({
	data = {
		startDate: '',
		endDate: '',
	},
}) => {
	
	const renderDates = () => {
		if (data.startDate && data.endDate) {
			const {dateStart, dateEnd} = convertDates(data.startDate, data.endDate);
			return (
				<>
					<div>
						<h4>Desde: </h4>
						<h4>{dateStart}</h4>
					</div>
					<div>
						<h4>Hasta: </h4>
						<h4>{dateEnd}</h4>
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
