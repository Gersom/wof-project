export const sortOffersOwner = (offers, sorts) => {
	if (
		sorts.some((sort) => sort.name === 'Fecha de publicación' && sort.value)
	) {
		return [...offers].sort((a, b) => {
			const dateA = new Date(a.startDate);
			const dateB = new Date(b.startDate);
			return dateA - dateB;
		});
	} else if (sorts.some((sort) => sort.name === 'Puntuación' && sort.value)) {
		return [...offers].sort((a, b) => {
			const scoreA = parseFloat(a.rating);
			const scoreB = parseFloat(b.rating);
			return scoreB - scoreA;
		});
	}

	return [...offers]; // Devuelve una copia del array original si no se debe ordenar
};
