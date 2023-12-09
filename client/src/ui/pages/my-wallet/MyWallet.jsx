import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import actionGetWallet from '@src/common/store/actions/walletActions';
import form from './walletIcons/form.svg'
import Cards from './Cards'
import ClientCards from './ClientCards'

const MyWallet = () => {
	const dispatch = useDispatch();
	const caregiverId = useSelector((state => state?.userReducer?.user?.caregiver?.id));
	const myWallet = useSelector(state => state?.myWallet?.MyWallet)
	const [emailPaypal, setEmailPaypal] = useState('')

	useEffect(() => {
		dispatch(actionGetWallet(caregiverId))
		console.log(myWallet);
		if(myWallet?.emailPaypal) setEmailPaypal(myWallet?.emailPaypal)
	},[caregiverId])

	const onchangeInput = (event) =>{
		setEmailPaypal(event.target.value)
		console.log(emailPaypal);
	}

	return (
		<div className={styles.walletContainer}>
			<h1>Mi Billetera</h1>
			<Cards dueBalance={myWallet?.dueBalance} recievedBalance={myWallet?.recievedBalance} clientsNumber={myWallet?.clients?.length}/>
			<div className={styles.contentSecond}> 
				<div>
					<div className={styles.paypalContent}>
						<div className={styles.dataPaypal}>Datos paypal:</div>
						<div className={styles.emailContent}>
							<img src={form} alt="form" />
							<div className={styles.paypalText}>Cuenta de Paypal:</div>
						</div>
						<input type="text" className={styles.inputText} placeholder='Escribe tu email de paypal' value={emailPaypal} onChange={onchangeInput}/>
						<button className={styles.inputButton}>Cambiar Cuenta</button>
						<div>
							
						</div>
					</div>
					<div className={styles.amountContent}>Ganancias:</div>
				</div>
				<ClientCards clients={myWallet?.clients}/>
			</div>
		</div>
	);
};

export default MyWallet;
