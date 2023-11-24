import styles from './styles.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '@src/ui/components/navbar/NavBar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {actionGetUser} from "@common/store/actions/userActions";
import {getFromLocalStorage} from "@common/utils/localStorage"
import routerNames from '@src/common/constants/routes';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {
    const userId = getFromLocalStorage("session")
    if (userId) {
      dispatch(actionGetUser(userId));
    } else {
      navigate(routerNames["login"]);
    }
	}, [dispatch, navigate]);
	return (
		<div className={styles.containerGrid}>
			<NavBar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
