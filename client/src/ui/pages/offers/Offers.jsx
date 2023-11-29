import styles from './styles.module.scss';
import FilterSortLocationBar from '@src/ui/components/filter-sort-location-bar/FilterSortLocationBar';
import OffersCareGivers from '@src/ui/components/offers/offers-care-givers/OffersCareGivers';
import OffersOwner from '@src/ui/components/offers/offers-owner/OffersOwner';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const Offers = () => {
	const role = useSelector((state) => state.userReducer.user.role);
	const {id } = useParams();
	console.log(id)
	const renderOffers = () => {
		if (role === 'caregiver') {
			return <OffersOwner />;
		} else {
			return <OffersCareGivers />;
		}
	};

	return (
		<div className={styles.containerGrid}>
			<h1>
				{role === 'caregiver'
					? 'Mascotas para cuidar'
					: 'Cuidadores para tu mascota'}
			</h1>
			<FilterSortLocationBar role={role} />
			{renderOffers()}
		</div>
	);
};

export default Offers;
