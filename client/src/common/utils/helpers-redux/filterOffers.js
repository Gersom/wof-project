export const filterOffers = (stateFilter, nameFilter) => {
    const updatedFilter = {};

    for (const key in stateFilter) {
      if (stateFilter[key].some(filter => filter.name === nameFilter)) {  // busco si esta en el array para no desactivar todos los filtros
        updatedFilter[key] = stateFilter[key].map(filter => ({
          ...filter,
          value: filter.name === nameFilter ? !filter.value : false, 
        }));
      } else {
        updatedFilter[key] = stateFilter[key];
      }
    }
  
    return updatedFilter;
  };
  