export const filterOffers = (stateFilter, nameFilter) => {
    const updatedFilter = {};
  
    for (const key in stateFilter) {
      if (stateFilter[key].some(filter => filter.name === nameFilter)) {
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
  