import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import cross from '@icons/filterSortLocationBar/cross.svg';

function FilterModal({ action, toggleFilterModal }) {
	const dispatch = useDispatch();
	const role = 'owner';
	const filters = useSelector((state) =>
		role === 'owner'
			? state.offersReducer.filtersOffersOwner
			: state.offersReducer.filtersOffersCareGivers
	);
	const handleClick = (name) => {
		dispatch(action(name));
	};

	const getFilters = () => {
		const filterNames = [];
		for (const key in filters) {
			filterNames.push(
				<div key={key} className={styles.containerFilter}>
					<h2>{key}</h2>
					<div className={styles.containerLine}>
						{filters[key].map((filter, index) => {
							return (
								<div key={index}>
									<h3
										key={filter.key}
										className={
											filter.value ? styles.filterActive : styles.filterInactive
										}
										onClick={() => handleClick(filter.name)}
									>
										{filter.name}
									</h3>
									{filter.value && (
										<img
											src={cross}
											alt='cross'
											onClick={() => handleClick(filter.name)}
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>
			);
		}
		return filterNames;
	};

	return (
		<div className={styles.containerMain}>
			<h1>Filtros de busqueda</h1>
			<div className={styles.container}>
				<img
					src={cross}
					alt='cross'
					onClick={toggleFilterModal}
					className={styles.cross}
				/>
				{getFilters()}
			</div>
		</div>
	);
}

export default FilterModal;
