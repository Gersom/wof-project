export const sortOffersCaregivers = (offers, sorts) => {
	if (
		sorts.some((sort) => sort.name === 'Fecha de publicación' && sort.value)
	) {
		return [...offers].sort((a, b) => {
			const dateA = new Date(a.startDate);
			const dateB = new Date(b.startDate);
			return dateA - dateB;
		});
	} else if (
		sorts.some((sort) => sort.name === 'Mejor puntuación' && sort.value)
	) {
		return [...offers].sort((a, b) => {
			return b.rating - a.rating;
		});
	} else if (sorts.some((sort) => sort.name === 'Precio' && sort.value)) {
		return [...offers].sort((a, b) => {
			const priceA = a.price.replace('$', '');
			const priceB = b.price.replace('$', '');
			return priceA - priceB;
		});
	}
	return [...offers];
};
