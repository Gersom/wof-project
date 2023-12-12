//imports helpers func sorts

//state

const offersState = {
	offersOwnerInmutable: [],
	offersCareGiversInmutable: [],
	offersOwner: [],
	offersCareGivers: [],
	filtersOffersOwner: {
		['Especie:']: [
			{
				name: '🐶 Perros',
				value: false,
				key: 'dog',
			},
			{
				name: '🐯 Gatos',
				value: false,
				key: 'cat',
			},
			{
				name: '♾️ Todas las especies',
				value: true,
				key: 'all',
				default: true,
			},
		],
		['Genero:']: [
			{
				name: '♂️ Machos',
				value: false,
				key: 'male',
			},
			{
				name: '♀️ Hembras',
				value: false,
				key: 'female',
			},
		],
	},
	sortOffersOwner: [
		{
			name: 'Mejor puntuación',
			value: false,
			key: 'score',
		},
		{
			name: 'Fecha de publicación',
			value: true,
			key: 'date',
			default: true,
		},
	],
	filtersOffersCareGivers: {
		['']: [
		],
	},
	sortOffersCareGivers: [
		{
			name: 'Mejor puntuación',
			value: false,
			key: 'score',
		},
		{
			name: 'Fecha de publicación',
			value: true,
			key: 'date',
			default: true,
		},
		{
			name: 'Precio',
			value: false,
			key: 'price',
		},
	],
};

export default offersState;
