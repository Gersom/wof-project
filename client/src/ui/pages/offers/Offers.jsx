import styles from './styles.module.css';
import FilterSortLocationBar from '@src/ui/components/filter-sort-location-bar/FilterSortLocationBar';
import OffersCareGivers from '@src/ui/components/offers-care-givers/OffersCareGivers';

const Offers = () => {
    const role = 'cuidador';

	const renderOffers = () => {
		if (role === 'cuidador') {
			return <OffersCareGivers/>;
		} else {
			return <h1>Ofertas de dueños</h1>;
		}
	}
	return (
		<div className={styles.containerGrid}>
			<h1>Cuidadores para tu mascotas</h1>
            <FilterSortLocationBar />
			{renderOffers()}
		</div>
	);
};

export default Offers;
