import routerNames from '@common/constants/routes';
import alerts from '@icons/nav/alerts.svg';
import user from '@icons/nav/user.svg';
import arrows from '@icons/nav/arrows.svg';
import house from '@icons/nav/house.svg';
import star from '@icons/nav/star.svg';
import points from '@icons/nav/points.svg';


export const LINKS = [
	{ to: routerNames['alerts'], imgSrc: alerts, label: 'Mis notificaciones' },
	{ to: routerNames['profile'], imgSrc: user, label: 'Perfil' },
];

const LINKS_CAREGIVER= [
	{ to: routerNames['alerts'], imgSrc: alerts, label: 'Mis notificaciones' },
	{ to: routerNames['offersCaregivers'], imgSrc: arrows, label: 'Ofertas' },
	{to: routerNames['myHome'], imgSrc: house, label: 'Mi hogar'},
	{to: routerNames['myClients'], imgSrc: star, label: 'Mis Clientes'},
	{ to: routerNames['profile'], imgSrc: user, label: 'Perfil' },
];
 const LINKS_OWNER = [
	{ to: routerNames['alerts'], imgSrc: alerts, label: 'Mis notificaciones' },
	{ to: routerNames['myPets'], imgSrc: points, label: 'Mis mascotas'},
	{ to: routerNames['offersOwners'], imgSrc: arrows, label: 'Ofertas' },
	{ to: routerNames['lastsCaregivers'], imgSrc: star, label: 'Cuidadores anteriores'}, 
	{ to: routerNames['profile'], imgSrc: user, label: 'Perfil' },
];

const LINKS_OWNER_ACTIVE = [
	...LINKS_OWNER,
	{ to: routerNames['myPetsEdit'], imgSrc: points, label: 'Editar mascota'},
];

const LINKS_CAREGIVER_ACTIVE = [
	...LINKS_CAREGIVER,
	{ to: routerNames['detailsCaregivers'] + 1, imgSrc: arrows, label: 'Detalles de la oferta'},
];

export const obtainLinks = (role, location) => {
	if (role === 'caregiver'){
		if(location.includes(routerNames['detailsCaregivers'])){
			return LINKS_CAREGIVER_ACTIVE;
		}
		return LINKS_CAREGIVER;
	}
	else if (role === 'owner'){
		if(location.includes(routerNames['myPetsEdit'])){
			return LINKS_OWNER_ACTIVE;
			}
		return LINKS_OWNER;
	}
	else {
		return LINKS;
	}
};
