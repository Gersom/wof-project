import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import CustomLinks from './CustomLinks';
import { obtainLinks } from './links';
import logo from '@icons/nav/logo.svg';
import burgerClose from '@icons/nav/burgerClose.svg';
import burgerOpen from '@icons/nav/burgerOpen.svg';
import handshake from '@icons/nav/handshake.svg';
import { useNavigate } from "react-router-dom";
import routerNames from "@src/common/constants/routes";
import {saveToLocalStorage} from "@common/utils/localStorage"

const NavBar = ({ userData }) => {
  const navigate = useNavigate();

	const [show, setShow] = useState(true);
	const classShow = show ? styles.show : '';
	const role = 'caregiver';
	const LINKS = obtainLinks(role);

	useEffect(() => {
		setShow(window.innerWidth > 768);
	}, []);

	const handleShow = () => {
		setShow(!show);
	};

  const closeSession = () => {
    saveToLocalStorage( "session","")
    navigate(routerNames["login"]);
  }

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
							<img src={handshake} />
							<span>Cuidador</span>
						</div>
					</div>
				</div>
				<nav className={styles.nav}>
					<ul className={styles.ul}>
						{LINKS.map((link, index) => (
							<CustomLinks
								key={index}
								to={link.to}
								imgSrc={link.imgSrc}
								label={link.label}
								show={show}
							/>
						))}
            <button className={`${styles.linkContainer}`}
            onClick={closeSession}>
              <img src='/src/ui/assets/icons/nav/padlock.svg' alt="Cerrar sesión" />
              {show && <li>Cerrar sesión</li>}
            </button>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default NavBar;
