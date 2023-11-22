import styles from './styles.module.scss';
import arrows from '@icons/filterSortLocationBar/arrows.svg';
import filter from '@icons/filterSortLocationBar/filter.svg';
import peru from '@icons/filterSortLocationBar/peru.svg';


const FilterSortLocationBar = () => {
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
			<div className={styles.filterContainer}>
                <h4>Filtros</h4>
                <img src={filter} alt='filter' />
            </div>
		</nav>
	);
};

export default FilterSortLocationBar;
