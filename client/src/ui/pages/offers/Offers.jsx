import styles from './styles.module.scss';
import FilterSortLocationBar from '@src/ui/components/filter-sort-location-bar/FilterSortLocationBar';
import OffersCareGivers from '@src/ui/components/offers-care-givers/OffersCareGivers';
import OffersOwner from '@src/ui/components/offers-owner/OffersOwner';
const Offers = () => {
    const role = 'owner';

	const renderOffers = () => {
		if (role === 'cuidador') {
			return <OffersCareGivers/>;
		} else {
			return <OffersOwner/>;
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
