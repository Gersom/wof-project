import styles from './styles.module.scss';
import filter from '@icons/filterSortLocationBar/filter.svg';
import peru from '@icons/filterSortLocationBar/peru.svg';
import FilterModal from '../filter-modal/FilterModal';
import SortSelect from '../sort-select/SortSelect';
import { useState } from 'react';
import useSelectorSortFilter from '@src/common/hooks/useSelectorSortFilter';

const FilterSortLocationBar = () => {
	const [filterModal, setFilterModal] = useState(false);
	const toggleFilterModal = () => {
		setFilterModal((prevFilterModal) => !prevFilterModal);
	};
	const handleOverlayClick = (event) => {
		if (event.target.classList.contains(styles.containerOverlay)) {
			setFilterModal(false);
		}
	};
	const {filters, sorts, actionFilter, actionSort} = useSelectorSortFilter({role: 'owner'});

	return (
		<nav className={styles.navContainer}>
			<div className={styles.locationContainer}>
				<img src={peru} alt='peru' />
				<h4>Perú</h4>
			</div>
			<SortSelect sorts={sorts} actionSort={actionSort} />
			<div className={styles.filterContainer} onClick={toggleFilterModal}>
				<h4>Filtros</h4>
				<img src={filter} alt='filter' />
			</div>
			{filterModal && (
				<div className={styles.containerOverlay} onClick={handleOverlayClick}>
					<div className={styles.containerModal}>
						<FilterModal
							filters={filters}
							action={actionFilter}
							toggleFilterModal={toggleFilterModal}
						/>
					</div>
				</div>
			)}
		</nav>
	);
};

export default FilterSortLocationBar;
