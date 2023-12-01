import styles from './styles.module.scss';
import Paypal from "@components/paypal/Paypal"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ModalPayment = ({
  successPaid= () => null,
  data= {
    "id": 1,
    "price": "15.00",
    "caregiverId": 1,
    "userId": 3,
    "name": "Jhonatan",
    "address": "Calle Buena esperanza",
    "profilePicture": "https://cdn.pixabay.com/photo/2016/09/14/19/53/person-1670247_1280.jpg",
    "rating": "4.62"
  }
}) => {

  const params = useParams();
  const userData = useSelector((state) => {
    return state.userReducer?.user
  });

	return (
		<div className={styles.modalContainer}>
			<h1>¿Como deseas pagar?</h1>
			<h3>
        Puedes hacerlo a través de PayPal o con una tarjeta de crédito o débito
			</h3>
      
			<div className={styles.PaypalDiv}>
        <Paypal 
          onPaid={successPaid}
          dataPost={{
          postId: params.id, 
          userId: userData.id, 
          caregiverId: data.caregiverId,
          description: `WOF.COM - Servicio de cuidado de mascota - Cuidador: ${data.name} - Dirección: ${data.address}`,
          price: parseFloat(data.price)
        }}
        ></Paypal>
			</div>
		</div>
	);
};
// asdasd
export default ModalPayment;
