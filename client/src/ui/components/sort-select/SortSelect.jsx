import styles from './styles.module.scss';
import arrowsBlue from '@icons/filterSortLocationBar/arrowsBlue.svg';
import arrowDrop from '@icons/filterSortLocationBar/arrowDrop.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function SortSelect({ sorts, actionSort }) {
	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const classActive = active ? styles.show : '';
	const [sortActive, setSortActive] = useState(
		sorts.filter((sort) => sort.default)[0].name
	);
	const handleSort = (name) => {
		setSortActive(name);
		dispatch(actionSort(name));
		setActive(false);
	};
	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<div className={styles.sortContainer}>
					<div>
						<img src={arrowsBlue} alt='arrows' />
						<h4>Ordenar por: </h4>
						<h5 onClick={() => setActive(!active)}>{sortActive}</h5>
					</div>
					<img
						src={arrowDrop}
						onClick={() => setActive(!active)}
						className={styles.arrowDrop}
					/>
				</div>
				<div className={`${styles.sortSelect} ${classActive}`}>
					{active &&
						sorts.map((sort) => {
                            if(sort.name === sortActive) return (<h4 className={styles.sortActive}>{sort.name}</h4>);
							return (
								<h4 key={sort.key} onClick={() => handleSort(sort.name)} className={styles.sortInactive}>
									{sort.name}
								</h4>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default SortSelect;
