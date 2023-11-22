import routerNames from '@common/constants/routes';

export const LINKS = [
	{ to: routerNames['offers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
	{ to: '/logout', imgSrc: '/src/ui/assets/icons/nav/padlock.svg', label: 'Cerrar sesión' },
];
const LINKS_CUIDADOR= [
	{ to: routerNames['offers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: '/clientes', imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Mis clientes' },
	{ to: '/perfil', imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
	{ to: '/logout', imgSrc: '/src/ui/assets/icons/nav/padlock.svg', label: 'Cerrar sesión' },
];
 const LINKS_CLIENTE = [
	{ to: routerNames['offers'], imgSrc: '/src/ui/assets/icons/nav/arrows.svg', label: 'Ofertas' },
	{ to: routerNames['profile'], imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Cuidadores anteriores'}, 
	{ to: '/mismascotas', imgSrc: '/src/ui/assets/icons/nav/star.svg', label: 'Mis mascotas'},
	{ to: '/perfil', imgSrc: '/src/ui/assets/icons/nav/user.svg', label: 'Perfil' },
	{ to: '/logout', imgSrc: '/src/ui/assets/icons/nav/padlock.svg', label: 'Cerrar sesión' },
];

export const obtainLinks = (role) => {
	if (role === 'cuidador'){
		return LINKS_CUIDADOR;
	}
	else if (role === 'cliente'){
		return LINKS_CLIENTE;
	}
	else {
		return LINKS;
	}
};