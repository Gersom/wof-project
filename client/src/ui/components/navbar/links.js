import routerNames from '@common/constants/routes';

export const LINKS = [
	{ to: routerNames['offers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
];
const LINKS_CAREGIVER= [
	{ to: routerNames['offersCaregivers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['detailsCaregivers'] + 1, imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Detalle de la Oferta' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
];
 const LINKS_OWNER = [
	{ to: routerNames['offersOwners'] + 1, imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Cuidadores anteriores'}, 
	{ to: routerNames['myPets'], imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Mis mascotas'},
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
];

export const obtainLinks = (role) => {
	if (role === 'caregiver'){
		return LINKS_CAREGIVER;
	}
	else if (role === 'owner'){
		return LINKS_OWNER;
	}
	else {
		return LINKS;
	}
};