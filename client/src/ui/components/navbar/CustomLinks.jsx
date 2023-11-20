import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const CustomLinks = ({ to, imgSrc, label, show }) => {
	const selected = useSelector((state) => state.navBarReducer.selected);
	const selectedStyle = selected === label.toLowerCase() ? styles.selected : '';
	return (
		<Link to={to} className={`${styles.linkContainer} ${selectedStyle}`}>
			<img src={imgSrc} alt={label} />
			{show && <li>{label}</li>}
		</Link>
	);
}; //comp

export default CustomLinks;
