import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetWallet, actionsEmailPaypal } from '@src/common/store/actions/walletActions';
import styles from './styles.module.scss';
import form from './walletIcons/form.svg'
import Cards from './Cards'
import ClientCards from './ClientCards'
import validation from './validationEmailPaypal/validation';
import { setAlert } from '@src/common/store/slices/alertSlice';
import axios from 'axios'
import { API_URL } from '@src/common/constants/api';

const MyWallet = () => {
	const dispatch = useDispatch();
	const caregiverId = useSelector((state => state?.userReducer?.user?.caregiver?.id));
	const [emailPaypal, setEmailPaypal] = useState('')
	const [errors,setErrors] = useState({})

	const [walletData, setWalletData] = useState({})


  const onchangeInput = (event) =>{
		setEmailPaypal(event.target.value)
		setErrors(validation({emailPaypal:event.target.value}))
		console.log(emailPaypal);
	}

	const onSubmit = async (event) => {
		
		try {

			event.preventDefault()
			if(!emailPaypal) return dispatch(setAlert({ message: "Ingresa un correo", type: "warning" }));
			if(Object.keys(errors).length !== 0) return dispatch(setAlert({ message: "Debe ingresar un correo válido", type: "warning" }))
			if(emailPaypal === walletData.emailPaypal) return dispatch(setAlert({ message: "Ya se encuentra usando este correo paypal", type: "warning" }));
			if(walletData.emailPaypal == setEmailPaypal) console.log('ya esta');

			await dispatch(actionsEmailPaypal({ emailPaypal, caregiverId }));
			
			await dispatch(actionGetWallet(caregiverId));

      dispatch(setAlert({ message: "Se guardó su correo de PayPal correctamente", type: "success" }));
		} catch (error) {
			console.error('Error al cambiar el correo de PayPal:', error);
			// Puedes manejar errores aquí si es necesario
		}
	}


  const getWallet = async () => {
    try {
      const response = await axios.get(`${API_URL}/my-wallet?caregiverId=${caregiverId}`);
      // console.log(response);
      setWalletData(response.data)
      setEmailPaypal(response.data.emailPaypal)
    } catch (error) {
      console.error(error);
    }
  }

	useEffect(() => {
    if(caregiverId) getWallet()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caregiverId]);
	
	
	return (
		<div className={styles.walletContainer}>
			<h1>Mi Billetera</h1>
			<Cards 
        dueBalance={walletData?.moneyToWithdraw} 
        recievedBalance={walletData?.moneyWithdrawn} 
        clientsNumber={walletData?.totalClients}/>

			<div className={styles.contentSecond}> 
				<div className={styles.content}>
					<div className={styles.paypalContent}>
						<div className={styles.dataPaypal}>Datos paypal:</div>
						<div className={styles.emailContent}>
							<img src={form} alt="form" />
							<div className={styles.paypalText}>Cuenta de Paypal:</div>
						</div>
						<div>
						<input type="text" className={styles.inputText} placeholder='Escribe tu email de paypal' value={emailPaypal} onChange={onchangeInput}/>
						<div className={styles.Errors}>{errors && errors.emailPaypal}</div>
						</div>
						<button id='button' type='submit' onClick={onSubmit} className={styles.inputButton}>{emailPaypal?'Cambiar cuenta':'Agregar cuenta'}</button>
						{/* <input id='button' type="submit" onClick={onSubmit} className={styles.inputButton} value='Cambiar cuenta'/> */}
						<div>
							
						</div>
					</div>
					{/* <div className={styles.amountContent}>Ganancias:</div> */}
				</div>
				<ClientCards clients={walletData?.clients}/>
			</div>
		</div>
	);
};

export default MyWallet;
