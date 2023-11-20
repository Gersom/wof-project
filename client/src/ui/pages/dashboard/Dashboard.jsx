import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';
import NavBar from '@src/ui/components/navbar/NavBar';

const Dashboard = () => {
	return (
		<div className={styles.containerGrid}>
			<NavBar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
