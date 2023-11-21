import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import cross from '@icons/filterSortLocationBar/cross.svg';

function FilterModal({ action , toggleFilterModal}) {
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
				<div key={key}>
					<h2>{key}</h2>
					{filters[key].map((filter, index) => {
						return (
							<div key={index}>
								<h3 key={filter.key} onClick={() => handleClick(filter.name)}>
									{filter.name}
								</h3>
								{filter.value && <img src={cross} alt='cross' />}
							</div>
						);
					})}
				</div>
			);
		}
		return filterNames;
	};

	return (
		<div className={styles.container}>
			<img src={cross} alt='cross' onClick={toggleFilterModal}/>
			{getFilters()}
		</div>
	);
}

export default FilterModal;
