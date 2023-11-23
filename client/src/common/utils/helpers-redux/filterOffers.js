export const filterOffers = (stateFilter, nameFilter) => {
	const updatedFilter = {};

	for (const key in stateFilter) {
		if (stateFilter[key].some((filter) => filter.name === nameFilter)) { // busca si esta en el array para no desactivar todos los filtros
			updatedFilter[key] = stateFilter[key].map((filter) => ({
				...filter,
				value: filter.name === nameFilter ? !filter.value : false,
			}));
			if (updatedFilter[key].every((filter) => filter.value === false)) { // si todos los filtros estan desactivados, activa el defautl
				updatedFilter[key] = stateFilter[key].map((filter) => ({
					...filter,
					value: filter.default,
				}));
			}
		} else {
			updatedFilter[key] = stateFilter[key];
		}
	}

	return updatedFilter;
};
