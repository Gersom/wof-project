import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import CustomLinks from './CustomLinks';
import { obtainLinks } from './links';
import logo from '@icons/nav/logo.svg';
import burgerClose from '@icons/nav/burgerClose.svg';
import burgerOpen from '@icons/nav/burgerOpen.svg';
import { saveToLocalStorage } from '@common/utils/localStorage';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';

const NavBar = ({ userData }) => {
	const {logout} = useAuth0();

	const [show, setShow] = useState(true);
	const [links, setLinks] = useState([]);
	const classShow = show ? styles.show : '';

	const idPost = useSelector((state) => state?.myPetsReducer?.myPets[0]?.id)

	useEffect(() => {
		setShow(window.innerWidth > 768);
	}, []);

	useEffect(() => {
		setLinks(obtainLinks(userData.role, idPost || 1));
	}, [userData.role]);

	const handleShow = () => {
		setShow(!show);
	};

	const handleRoleRender = () => {
		if (userData.role === 'owner') {
			return (
				<>
					<span>
						<span>🐶</span> Dueño
					</span>
				</>
			);
		} else if (userData.role === 'caregiver') {
			return (
				<>
					<span>
						<span>🤝</span> Cuidador
					</span>
				</>
			);
		} else {
			return <>Indefinido</>;
		}
	};

	const closeSession = () => {
		saveToLocalStorage('session', '');
		logout({logoutParams: { returnTo: window.location.origin }});
		// navigate(routerNames['login']);
	};

	return (
		<aside className={`${styles.aside} ${classShow}`}>
			<div className={styles.containerSticky}>
				<div className={styles.containerLogo}>
					{show ? (
						<img
							src={burgerOpen}
							className={styles.burger}
							onClick={handleShow}
						/>
					) : (
						<img
							src={burgerClose}
							className={styles.burger}
							onClick={handleShow}
						/>
					)}
					<div className={styles.containerLogoChild}>
						<img src={logo} alt='logo' className={styles.logo} />
						{show && <h4>.com</h4>}
					</div>
				</div>
				<div className={styles.containerProfile}>
					<img
						src={userData.profilePicture}
						alt='logo'
						className={styles.imgProfile}
					/>
					<div className={styles.containerProfileChild}>
						<h5>{userData.name}</h5>
						{show && <span>{userData.email}</span>}
						<div className={styles.containerHandshake}>
							{handleRoleRender()}
						</div>
					</div>
				</div>
				<nav className={styles.nav}>
					<ul className={styles.ul}>
						{links.map((link, index) => (
							<CustomLinks
								key={index}
								to={link.to}
								imgSrc={link.imgSrc}
								label={link.label}
								show={show}
							/>
						))}
						<button
							className={`${styles.linkContainer}`}
							onClick={closeSession}
						>
							<img
								src='/src/ui/assets/icons/nav/padlock.svg'
								alt='Cerrar sesión'
							/>
							{show && <li>Cerrar sesión</li>}
						</button>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default NavBar;
