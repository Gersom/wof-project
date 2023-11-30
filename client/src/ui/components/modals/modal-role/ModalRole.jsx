import { API_URL_USER } from '@src/common/constants/api';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ModalPublicPet = ({
  successCreateRole= () => null
}) => {

  const user = useSelector(state => state.userReducer.user);

  const postNewRole = async (role) => {
    
    try {
      const urlPost = `${API_URL_USER}/${user?.id}/new-role`
      const response = await axios.post(urlPost, {role});
      console.log('New role success', response);
      successCreateRole()
    } catch (error) {
      console.error(error);
    }
  }
  
  const clickHandler = (role) => {
    if (user.id) postNewRole(role)
    else console.error('No hay datos de user en Redux');
  }

	return (
		<div className={styles.modalContainer}>
			<h1>¿Como deseas registrarte en WOF?</h1>
			<h3>
        Esto definirá tu forma de interactuar con nosotros
			</h3>
			<div>
				<button className={styles.buttonRole}
        onClick={()=>clickHandler('owner')}>
          <span className={styles.textIcon}>🐶</span>
          <span className={styles.text}>dueño</span>
        </button>
				<button className={styles.buttonRole}
        onClick={()=>clickHandler('caregiver')}>
          <span className={styles.textIcon}>🤝</span>
          <span className={styles.text}>Cuidador</span>
        </button>
			</div>
		</div>
	);
};
// asdasd
export default ModalPublicPet;
