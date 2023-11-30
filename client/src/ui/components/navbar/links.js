import routerNames from '@common/constants/routes';

var active = false;

export const LINKS = [
	{ to: routerNames['alerts'], imgSrc: '/src/ui/assets/icons/nav/alerts.svg', label: 'Mis notificaciones' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
	{ to: routerNames['offers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
];
const LINKS_CAREGIVER= [
	{ to: routerNames['alerts'], imgSrc: '/src/ui/assets/icons/nav/alerts.svg', label: 'Mis notificaciones' },
	{ to: routerNames['offersCaregivers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{to: routerNames['myHome'], imgSrc: '/src/ui/assets/icons/nav/house.svg', label: 'Mi hogar'},
	{to: routerNames['myClients'], imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Mis Clientes'},
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
];
 const LINKS_OWNER = [
	{ to: routerNames['alerts'], imgSrc: '/src/ui/assets/icons/nav/alerts.svg', label: 'Mis notificaciones' },
	{ to: routerNames['myPets'], imgSrc: '/src/ui/assets/icons/nav/points.svg', label: 'Mis mascotas'},
	{ to: routerNames['offersOwners'] + 1, imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['lastsCaregivers'], imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Cuidadores anteriores'}, 
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
];

const LINKS_OWNER_ACTIVE = [
	...LINKS_OWNER,
	{ to: routerNames['myPetsEdit'], imgSrc: '/src/ui/assets/icons/nav/points.svg', label: 'Editar mascota'},
];

const LINKS_CAREGIVER_ACTIVE = [
	...LINKS_CAREGIVER,
	{ to: routerNames['detailsCaregivers'] + 1, imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Detalles de la oferta'},
];

export const obtainLinks = (role, idPost, location) => {
	if (role === 'caregiver'){
		if(location.includes(routerNames['detailsCaregivers'])){
			return LINKS_CAREGIVER_ACTIVE;
		}
		return LINKS_CAREGIVER;
	}
	else if (role === 'owner'){
		LINKS_OWNER[2].to = routerNames['offersOwners'] + idPost;
		if(location.includes(routerNames['myPetsEdit'])){
			return LINKS_OWNER_ACTIVE;
			}
		return LINKS_OWNER;
	}
	else {
		return LINKS;
	}
};
