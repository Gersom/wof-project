import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetWallet, actionsEmailPaypal } from '@src/common/store/actions/walletActions';
import styles from './styles.module.scss';
import form from './walletIcons/form.svg'
import Cards from './Cards'
import ClientCards from './ClientCards'
import validation from './validationEmailPaypal/validation';

const MyWallet = () => {
	const dispatch = useDispatch();
	const caregiverId = useSelector((state => state?.userReducer?.user?.caregiver?.id));
	const myWallet = useSelector(state => state?.myWallet?.MyWallet)
	const [emailPaypal, setEmailPaypal] = useState('')
	const [errors,setErrors] = useState({})
	useEffect(() => {
		// dispatch(actionGetWallet(caregiverId))
		// .then(() => {
    //   if (myWallet && myWallet.emailPaypal) {
    //     setEmailPaypal(myWallet.emailPaypal);
    //   }
    // });
		const fetchData = async () => {
      try {
        await dispatch(actionGetWallet(caregiverId))
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
	},[caregiverId,dispatch])

	useEffect(() => {
    if (myWallet && myWallet.emailPaypal) {
      setEmailPaypal(myWallet.emailPaypal);
    }
  }, [myWallet]);
	
	const onchangeInput = (event) =>{
		setEmailPaypal(event.target.value)
		setErrors(validation({emailPaypal:event.target.value}))
		console.log(emailPaypal);
	}

	const onSubmit = async (event) => {
		
		try {

			event.preventDefault()
			if(!emailPaypal) return alert('Ingresa un correo')
			if(Object.keys(errors).length !== 0) return alert('Debe ingresar un correo válido')
			if(emailPaypal === myWallet.emailPaypal) return alert('Ya se encuentra usando este correo paypal')
			if(myWallet.emailPaypal == setEmailPaypal) console.log('ya esta');

			await dispatch(actionsEmailPaypal({ emailPaypal, caregiverId }));
			
			await dispatch(actionGetWallet(caregiverId));

			alert('Se guardó su correo de PayPal correctamente');
		} catch (error) {
			console.error('Error al cambiar el correo de PayPal:', error);
			// Puedes manejar errores aquí si es necesario
		}
	}

	return (
		<div className={styles.walletContainer}>
			<h1>Mi Billetera</h1>
			<Cards dueBalance={myWallet?.dueBalance} recievedBalance={myWallet?.recievedBalance} clientsNumber={myWallet?.clients?.length}/>
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
				<ClientCards clients={myWallet?.clients}/>
			</div>
		</div>
	);
};

export default MyWallet;
