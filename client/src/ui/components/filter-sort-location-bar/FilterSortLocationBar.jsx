import styles from './styles.module.scss';
import arrows from '@icons/filterSortLocationBar/arrows.svg';
import filter from '@icons/filterSortLocationBar/filter.svg';
import peru from '@icons/filterSortLocationBar/peru.svg';
import FilterModal from '../filter-modal/FilterModal';
import { useState } from 'react';
import { actionFilterOffersOwner } from '@src/common/store/actions/offersActions';

const FilterSortLocationBar = () => {
	const [filterModal, setFilterModal] = useState(false);
	const toggleFilterModal = () => {
		setFilterModal((prevFilterModal) => !prevFilterModal);
	};
	return (
		<nav className={styles.navContainer}>
			<div className={styles.locationContainer}>
				<img src={peru} alt='peru' />
				<h4>Perú</h4>
			</div>
			<div className={styles.sortContainer}>
				<img src={arrows} alt='arrows' />
				<h4>Ordenar por: localidad</h4>
			</div>
			<div className={styles.filterContainer} onClick={toggleFilterModal}>
				<h4>Filtros</h4>
				<img src={filter} alt='filter' />
			</div>
			{filterModal && (
				<div className={styles.containerOverlay}>
					<div className={styles.containerModal}>
						<FilterModal
							action={actionFilterOffersOwner}
							toggleFilterModal={toggleFilterModal}
						/>
					</div>
				</div>
			)}
		</nav>
	);
};

export default FilterSortLocationBar;
