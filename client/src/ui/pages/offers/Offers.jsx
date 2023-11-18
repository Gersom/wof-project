import styles from './styles.module.css';
import FilterSortLocationBar from '@src/ui/components/filter-sort-location-bar/FilterSortLocationBar';
const Offers = () => {
    const role = 'owner';
	return (
		<div className={styles.containerGrid}>
			<h1>Cuidadores para tu mascotas</h1>
            <FilterSortLocationBar />
		</div>
	);
};

export default Offers;
