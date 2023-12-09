import styles from './styles.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '@src/ui/components/navbar/NavBar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionGetUser } from '@common/store/actions/userActions';
import { getFromLocalStorage } from '@common/utils/localStorage';
import routerNames from '@src/common/constants/routes';
import userReducer from '@src/common/store/reducers/userReducer';
import ModalCustom from '@src/ui/components/modals/modal-custom/ModalCustom';
import ModalReview from '@src/ui/components/modals/modal-review/ModalReview';
import useWsCaregiver from '@src/common/utils/websocket/useWsCaregiver';
import useWsOwner from '@src/common/utils/websocket/useWsOwner';
import Chat from '@src/ui/components/chat/Chat';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	userReducer;
	const userData = useSelector((state) => state?.userReducer?.user);

	useWsCaregiver(userData?.role || null);
	useWsOwner(userData?.role || null);

	useEffect(() => {
		const { userId } = getFromLocalStorage('session');
		if (userId) {
			dispatch(actionGetUser(userId));
		} else {
			navigate(routerNames['login']);
		}
	}, [dispatch, navigate]);

	return (
		<>
			<div className={styles.containerGrid}>
				<Chat userData={userData}/>
				<NavBar userData={userData} />
				<Outlet />
				<ModalCustom state={false}>
					<ModalReview />
				</ModalCustom>
			</div>
		</>
	);
};

export default Dashboard;
