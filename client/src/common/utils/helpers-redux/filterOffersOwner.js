// export const filterOffersOwner = (offers, filters) => {
// 	return Object.values(filters).reduce(
// 		(filteredOffers, filter) => {
// 			if (filter.name === '🐶 Perros' && filter.value) {
// 				return filteredOffers.filter((offer) => offer.pet.species.name === 'dog');
// 			} else if (filter.name === '🐯 Gatos' && filter.value) {
                
// 				return filteredOffers.filter((offer) => offer.pet.species.name === 'cat');
// 			}  else {
// 				return filteredOffers;
// 			}
// 		},
// 		[...offers]
// 	);
// };

export const filterOffersOwner = (offers, filters) => {
    let filteredOffers = [...offers];
  
    for (const key in filters) {
      filters[key].forEach((filter) => {
        if (filter.name === '🐶 Perros' && filter.value) {
          filteredOffers = filteredOffers.filter((offer) => offer.pet.species.name === 'dog');
        } else if (filter.name === '🐯 Gatos' && filter.value) {
          filteredOffers = filteredOffers.filter((offer) => offer.pet.species.name === 'cat');
        } else if (filter.name === '♂️ Machos' && filter.value) {
          filteredOffers = filteredOffers.filter((offer) => offer.pet.gender === 'male');
        } else if (filter.name === '♀️ Hembras' && filter.value) {
          filteredOffers = filteredOffers.filter((offer) => offer.pet.gender === 'female');
        }
      });
    }
  
    return filteredOffers;
  };

// else if (filter.name === '♂️ Machos' && filter.value) {
//     return filteredOffers.filter((offer) => offer.pet.gender === 'male');
// } else if (filter.name === '♀️ Hembras' && filter.value) {
//     return filteredOffers.filter((offer) => offer.pet.gender === 'female');
// }