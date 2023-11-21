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
				key: 'dog'
			},
			{
				name: '🐯 Gatos',
				value: false,
				key: 'cat'
			},
		],
		['Genero:']: [
			{
				name: '♂️ Machos',
				value: false,
				key : 'male'
			},
			{
				name: '♀️ Hembras',
				value: false,
				key : 'female'
			},
		],
	},
	filtersOffersCareGivers: {},
};

export default offersState;
