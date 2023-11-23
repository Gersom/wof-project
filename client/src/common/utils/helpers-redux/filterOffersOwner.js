export const filterOffersOwner = (offers, filters) => {
	return Object.values(filters).reduce(
		(filteredOffers, filter) => {
			if (filter.name === '🐶 Perros' && filter.value) {
				return filteredOffers.filter((offer) => offer.species === 'dog');
			} else if (filter.name === '🐯 Gatos' && filter.value) {
				return filteredOffers.filter((offer) => offer.species === 'cat');
			} else if (filter.name === '♂️ Machos' && filter.value) {
				return filteredOffers.filter((offer) => offer.gender === 'male');
			} else if (filter.name === '♀️ Hembras' && filter.value) {
				return filteredOffers.filter((offer) => offer.gender === 'female');
			} else {
				return filteredOffers;
			}
		},
		[...offers]
	);
};
