import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import cross from '@icons/filterSortLocationBar/cross.svg';

function FilterModal({ action,filters}) {
	const dispatch = useDispatch();
	
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
									<img
										className={
											filter.value ? styles.crossActive : styles.crossInactive
										}
										src={cross}
										alt='cross'
										onClick={() => { filter.value && handleClick(filter.name)}}
									/>
									
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
				{getFilters()}
			</div>
		</div>
	);
}

export default FilterModal;
