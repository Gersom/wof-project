import styles from './styles.module.scss';
import filter from '@icons/filterSortLocationBar/filter.svg';
import argentina from '@icons/filterSortLocationBar/argentina.svg';
import ModalFilter from '../modals/modal-filter/ModalFilter';
import SortSelect from '../sort-select/SortSelect';
import ModalCustom from '../modals/modal-custom/ModalCustom';
import { useState } from 'react';
import useSelectorSortFilter from '@src/common/hooks/useSelectorSortFilter';

const FilterSortLocationBar = ({role}) => {
	const [filterModal, setFilterModal] = useState(false);
	const toggleFilterModal = () => {
		setFilterModal((prevFilterModal) => !prevFilterModal);
	};
	const {filters, sorts, actionFilter, actionSort} = useSelectorSortFilter({role: role});
	const stylesDisabled = role === 'owner' ? styles.disabled : '';

	return (
		<nav className={styles.navContainer}>
			<div className={styles.locationContainer}>
				<img src={argentina} alt='peru' />
				<h4>Argentina</h4>
			</div>
			<SortSelect sorts={sorts} actionSort={actionSort} />
			<div className={`${styles.filterContainer} ${stylesDisabled}`} onClick={role === 'caregiver' && toggleFilterModal}>
				<h4>Filtros</h4>
				<img src={filter} alt='filter' />
			</div>
			<ModalCustom state={filterModal} toggleModal={toggleFilterModal} isWarning={true}>
				<ModalFilter filters={filters} action={actionFilter} />
			</ModalCustom>
		</nav>
	);
};

export default FilterSortLocationBar;
