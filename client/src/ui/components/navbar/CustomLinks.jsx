import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const CustomLinks = ({ to, imgSrc, label, show }) => {
	const location = useLocation();
	const actualRoute = location.pathname;

	const delNumberSlash = (inputString) => {
		const match = inputString?.match(/\/(\d+)$/);
		if (match) return inputString.slice(0, -match[1].length);
		else return inputString;
	};

	const selectedStyle =
		delNumberSlash(actualRoute) === delNumberSlash(to) ? styles.selected : '';

	// const selected = useSelector((state) => state.navBarReducer.selected);
	// const selectedStyle = actualRoute === label.toLowerCase() ? styles.selected : '';

	return (
		<>
			<Link to={to} className={`${styles.linkContainer} ${selectedStyle}`}>
				<img src={imgSrc} alt={label} />
				{show && <li>{label}</li>}
			</Link>
		</>
	);
};

export default CustomLinks;
